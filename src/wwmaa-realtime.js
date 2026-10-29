/**
 * WWMAA shared-state realtime helper.
 *
 * SECURITY NOTE:
 * This helper deliberately requires a Supabase Auth session. The current
 * WWMAA login uses a client-side users.json/localStorage session, which is
 * NOT a secure identity for database authorization. Do not weaken the SQL
 * policies to anon/public just to make this work.
 */
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  realtime: { params: { eventsPerSecond: 10 } },
}) : null

const STATE_KEY = 'association'

/**
 * Load shared state and subscribe to updates.
 * `onState` receives the shared JSON payload whenever it changes.
 * Returns an async cleanup-safe function that unsubscribes.
 *
 * Requires a signed-in Supabase Auth user and an appropriate membership role.
 */
export async function subscribeToWWMAAState(onState, onStatus = () => {}) {
  if (!supabase) {
    onStatus('missing-config')
    return () => {}
  }

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session?.user) {
    onStatus('auth-required')
    return () => {}
  }

  const { data: row, error } = await supabase
    .from('wwmaa_live_state')
    .select('payload, updated_at')
    .eq('state_key', STATE_KEY)
    .maybeSingle()

  if (error) {
    onStatus('load-error')
    console.error('[WWMAA realtime] Initial state load failed:', error.message)
  } else if (row?.payload) {
    onState(row.payload, { source: 'initial', updatedAt: row.updated_at })
  }

  const channel = supabase
    .channel('wwmaa-live-state')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'wwmaa_live_state',
      filter: `state_key=eq.${STATE_KEY}`,
    }, payload => {
      if (payload.new?.payload) {
        onState(payload.new.payload, { source: 'realtime', updatedAt: payload.new.updated_at })
      }
    })
    .subscribe(status => onStatus(status.toLowerCase()))

  return () => { void supabase.removeChannel(channel) }
}

/**
 * Persist shared state. The database's RLS policies are the security boundary;
 * never ship a service-role key in browser code.
 */
export async function saveWWMAAState(payload) {
  if (!supabase) throw new Error('Supabase configuration is missing.')
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) throw new Error('Please sign in with Supabase Auth before syncing shared records.')

  const { error } = await supabase.from('wwmaa_live_state').upsert({
    state_key: STATE_KEY,
    payload,
    updated_by: session.user.id,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'state_key' })

  if (error) throw error
}
