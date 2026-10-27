import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Shield, Users, CalendarDays, ClipboardCheck, MapPin, Settings, LogOut,
  Search, Plus, ChevronRight, Bell, Menu, X, Swords, Trophy, UserRound,
  Building2, Eye, Pencil, KeyRound, CircleHelp, Check, Clock3
} from 'lucide-react'
import './styles.css'

const initialStudents = [
  { id: 'WW-1001', name: 'Arjun K.', dojo: 'Triprayar Dojo', belt: 'Green Belt', role: 'Student', style: 'Karate' },
  { id: 'WW-1002', name: 'Meera S.', dojo: 'Triprayar Dojo', belt: 'Orange Belt', role: 'Student', style: 'Karate' },
  { id: 'SN-0201', name: 'Sanjay P.', dojo: 'Thrissur Central', belt: 'Black Belt', role: 'Senpai', style: 'Karate' },
  { id: 'SI-0001', name: 'Sensei R.', dojo: 'Triprayar Dojo', belt: 'Black Belt', role: 'Sensi', style: 'Karate' },
]
const initialEvents = [
  { id: 1, title: 'Monthly Karate Training', type: 'Karate', date: '2026-11-02', time: '07:00 AM', place: 'Triprayar Dojo', status: 'Upcoming' },
  { id: 2, title: 'Kick Boxing Skills Session', type: 'Kick boxing', date: '2026-11-08', time: '04:00 PM', place: 'Thrissur Central', status: 'Upcoming' },
  { id: 3, title: 'Association Belt Assessment', type: 'Karate', date: '2026-11-15', time: '09:00 AM', place: 'Main Dojo', status: 'Registration open' },
]
const navItems = [
  ['Overview', 'overview', Shield], ['Student details', 'students', Users],
  ['Attendance', 'attendance', ClipboardCheck], ['Upcoming events', 'events', CalendarDays],
  ['Dojos', 'dojos', MapPin], ['Control panel', 'control', Settings]
]

function App() {
  const [session, setSession] = useState(null)
  const [loginId, setLoginId] = useState('')
  const [passcode, setPasscode] = useState('')
  const [previewRole, setPreviewRole] = useState('A Level')
  const [loginMode, setLoginMode] = useState('admin')
  const [active, setActive] = useState('overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [students, setStudents] = useState(initialStudents)
  const [events, setEvents] = useState(initialEvents)
  const [query, setQuery] = useState('')
  const [eventType, setEventType] = useState('All')
  const [showStudentForm, setShowStudentForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [notice, setNotice] = useState('')
  const [newStudent, setNewStudent] = useState({ name: '', id: '', dojo: 'Triprayar Dojo', belt: 'White Belt', role: 'Student' })
  const [newEvent, setNewEvent] = useState({ title: '', type: 'Karate', date: '', time: '', place: 'Triprayar Dojo' })
  const role = session?.role || 'Student / Senpai / Sensi'
  const isA = role === 'A Level'
  const isB = role === 'B Level'
  const canManage = isA || isB
  const canManageEverything = isA || isB
  const filteredStudents = useMemo(() => students.filter(s => `${s.name} ${s.id} ${s.dojo} ${s.belt}`.toLowerCase().includes(query.toLowerCase())), [students, query])
  const filteredEvents = useMemo(() => events.filter(e => eventType === 'All' || e.type === eventType), [events, eventType])

  function login(e) {
    e.preventDefault()
    if (!loginId.trim() || !passcode.trim()) {
      setNotice('Enter your ID and password to continue.')
      return
    }
    const chosenRole = loginMode === 'student' ? 'Student / Senpai / Sensi' : previewRole
    setSession({ id: loginId.trim(), role: chosenRole, loginMode })
    setActive('overview')
    setNotice('')
  }
  function addStudent(e) {
    e.preventDefault()
    if (!newStudent.name.trim() || !newStudent.id.trim()) return
    setStudents(prev => [...prev, { ...newStudent, style: 'Karate' }])
    setNewStudent({ name: '', id: '', dojo: 'Triprayar Dojo', belt: 'White Belt', role: 'Student' })
    setShowStudentForm(false)
    setNotice('Student profile added in this browser preview.')
  }
  function addEvent(e) {
    e.preventDefault()
    if (!newEvent.title.trim() || !newEvent.date) return
    setEvents(prev => [...prev, { ...newEvent, id: Date.now(), status: 'Upcoming' }])
    setNewEvent({ title: '', type: 'Karate', date: '', time: '', place: 'Triprayar Dojo' })
    setShowEventForm(false)
    setNotice('Event added in this browser preview.')
  }

  if (!session) return <Login login={login} loginId={loginId} setLoginId={setLoginId} passcode={passcode} setPasscode={setPasscode} previewRole={previewRole} setPreviewRole={setPreviewRole} loginMode={loginMode} setLoginMode={setLoginMode} notice={notice} />

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <img src="/logo.png" alt="WWMAA crest" onError={e => e.currentTarget.style.display='none'} />
        <div><b>WWMAA</b><span>MEMBER PORTAL</span></div>
        <button className="icon-btn close-nav" onClick={() => setMobileNav(false)}><X size={19}/></button>
      </div>
      <div className="association-tag"><span className="red-dot"/> WORLD WIDE MARTIAL ARTS ASSOCIATION</div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{navItems.filter(([label]) => (label !== 'Control panel' || canManage) && (session.loginMode !== 'student' || ['Overview','Student details','Attendance','Upcoming events','Dojos'].includes(label))).map(([label, key, Icon]) =>
        <button key={key} className={`nav-link ${active === key ? 'active' : ''}`} onClick={() => {setActive(key);setMobileNav(false)}}>
          <Icon size={18}/><span>{label}</span>{active === key && <ChevronRight size={15} className="nav-chevron"/>}
        </button>
      )}</nav>
      <div className="sidebar-bottom">
        <div className="role-card"><div className="role-icon"><Shield size={18}/></div><div><small>ACCESS LEVEL</small><strong>{role}</strong></div><span className="online-dot"/></div>
        <button className="nav-link logout" onClick={() => {setSession(null);setPasscode('');setLoginId('')}}><LogOut size={18}/><span>Sign out</span></button>
        <small className="version">WWMAA PORTAL · PREVIEW 1.0</small>
      </div>
    </aside>
    {mobileNav && <div className="scrim" onClick={() => setMobileNav(false)} />}
    <main className="main-area">
      <header className="topbar">
        <button className="icon-btn menu-btn" onClick={() => setMobileNav(true)}><Menu size={21}/></button>
        <div className="breadcrumb">Portal <span>/</span> <b>{navItems.find(n => n[1] === active)?.[0] || 'Overview'}</b></div>
        <div className="top-actions"><span className="status-pill"><i/> Association portal</span><button className="icon-btn notification"><Bell size={18}/><i/></button><div className="avatar">{session.id.slice(0,2).toUpperCase()}</div><div className="user-meta"><b>{session.id}</b><small>{role}</small></div></div>
      </header>
      <div className="page-content">
        {notice && <div className="notice"><Check size={16}/>{notice}<button onClick={() => setNotice('')}><X size={15}/></button></div>}
        {active === 'overview' && <Overview role={role} students={students} events={events} setActive={setActive} />}
         {active === 'students' && (session.loginMode === 'student' ? <StudentProfile session={session} students={students} events={events} /> : <Students students={filteredStudents} query={query} setQuery={setQuery} canManage={canManage} isA={isA} setShowStudentForm={setShowStudentForm} />)}
         {active === 'attendance' && (session.loginMode === 'student' ? <StudentAttendance session={session} /> : <Attendance students={students} />)}
        {active === 'events' && <Events events={filteredEvents} eventType={eventType} setEventType={setEventType} canManage={canManage} setShowEventForm={setShowEventForm} />}
        {active === 'dojos' && <Dojos isA={isA} canManage={canManage} />}
         {active === 'control' && canManageEverything && <Control isA={isA} isB={isB} students={students} />}
      </div>
    </main>
    {showStudentForm && <Modal title="Add student profile" close={() => setShowStudentForm(false)}><form className="form-grid" onSubmit={addStudent}><label>Student name<input required value={newStudent.name} onChange={e=>setNewStudent({...newStudent,name:e.target.value})} placeholder="Full name"/></label><label>Student / Senpai ID<input required value={newStudent.id} onChange={e=>setNewStudent({...newStudent,id:e.target.value.toUpperCase()})} placeholder="WW-1005"/></label><label>Dojo<select value={newStudent.dojo} onChange={e=>setNewStudent({...newStudent,dojo:e.target.value})}><option>Triprayar Dojo</option><option>Thrissur Central</option><option>Main Dojo</option></select></label><label>Current belt<select value={newStudent.belt} onChange={e=>setNewStudent({...newStudent,belt:e.target.value})}>{['White Belt','Yellow Belt','Orange Belt','Green Belt','Blue Belt','Brown Belt','Black Belt'].map(x=><option key={x}>{x}</option>)}</select></label><label>Member type<select value={newStudent.role} onChange={e=>setNewStudent({...newStudent,role:e.target.value})}><option>Student</option><option>Senpai</option><option>Sensi</option></select></label><div className="form-actions"><button type="button" className="btn secondary" onClick={()=>setShowStudentForm(false)}>Cancel</button><button className="btn primary"><Plus size={16}/> Add profile</button></div></form></Modal>}
    {showEventForm && <Modal title="Create association event" close={() => setShowEventForm(false)}><form className="form-grid" onSubmit={addEvent}><label>Event name<input required value={newEvent.title} onChange={e=>setNewEvent({...newEvent,title:e.target.value})} placeholder="Training session"/></label><label>Event type<select value={newEvent.type} onChange={e=>setNewEvent({...newEvent,type:e.target.value})}><option>Karate</option><option>Kick boxing</option></select></label><label>Date<input type="date" required value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})}/></label><label>Time<input value={newEvent.time} onChange={e=>setNewEvent({...newEvent,time:e.target.value})} placeholder="07:00 AM"/></label><label>Dojo / venue<input value={newEvent.place} onChange={e=>setNewEvent({...newEvent,place:e.target.value})}/></label><div className="form-actions"><button type="button" className="btn secondary" onClick={()=>setShowEventForm(false)}>Cancel</button><button className="btn primary"><Plus size={16}/> Create event</button></div></form></Modal>}
  </div>
}

function Login({login,loginId,setLoginId,passcode,setPasscode,previewRole,setPreviewRole,loginMode,setLoginMode,notice}) {
  return <div className="login-screen"><div className="login-visual"><div className="login-top-brand"><img src="/logo.png" alt="WWMAA crest"/><div><b>WORLD WIDE</b><span>MARTIAL ARTS ASSOCIATION</span></div></div><div className="hero-copy"><div className="eyebrow"><span/> DISCIPLINE · RESPECT · COURAGE</div><h1>FORGED BY<br/><em>DISCIPLINE.</em></h1><p>ONE ASSOCIATION. ONE SPIRIT. A LIFETIME OF MASTERY.</p><div className="hero-stats"><div><b>1983</b><span>Since</span></div><i/><div><b>01</b><span>Association</span></div><i/><div><b>∞</b><span>Possibilities</span></div></div></div><div className="brush-mark">武 道</div><div className="login-footer">WORLD WIDE MARTIAL ARTS ASSOCIATION <span>•</span> BUILT ON DISCIPLINE</div></div><div className="login-panel"><div className="mobile-crest"><img src="/logo.png" alt="WWMAA crest"/></div><div className="login-card"><div className="login-heading"><div className="mini-icon"><KeyRound size={20}/></div><div className="eyebrow">{loginMode === 'student' ? 'STUDENT & INSTRUCTOR ACCESS' : 'ADMINISTRATOR ACCESS'}</div><h2>{loginMode === 'student' ? 'Welcome, warrior.' : 'Welcome back.'}</h2><p>{loginMode === 'student' ? 'Sign in to view your profile, training and events.' : 'Sign in to manage the association portal.'}</p></div>
    <div className="login-mode-tabs"><button type="button" className={loginMode==='student'?'selected':''} onClick={()=>{setLoginMode('student');setNotice('')}}><Users size={15}/> Student / Senpai / Sensi</button><button type="button" className={loginMode==='admin'?'selected':''} onClick={()=>{setLoginMode('admin');setNotice('')}}><Shield size={15}/> Admin login</button></div>
    <form onSubmit={login}><label className="field-label">STUDENT / SENPAI / SENSI ID<div className="input-wrap"><UserRound size={18}/><input autoComplete="username" value={loginId} onChange={e=>setLoginId(e.target.value)} placeholder="Enter your association ID" required/></div></label><label className="field-label">PASSCODE<div className="input-wrap"><KeyRound size={18}/><input autoComplete="current-password" type="password" value={passcode} onChange={e=>setPasscode(e.target.value)} placeholder="Enter passcode" required/></div></label> {loginMode === 'admin' && <label className="field-label">ADMIN ACCESS LEVEL<select className="role-select" value={previewRole} onChange={e=>setPreviewRole(e.target.value)}><option>A Level</option><option>B Level</option></select></label>}<button className="btn primary login-submit">Enter member portal <ChevronRight size={18}/></button>{notice && <div className="error-msg">{notice}</div>}</form><div className="login-note"><Shield size={15}/><span>{loginMode === 'student' ? 'Student, Senpai and Sensi accounts use the separate member sign-in.' : 'Administrator accounts only. A and B levels can manage association accounts and passwords.'}</span></div><div className="demo-warning">DEMO PREVIEW · NOT SECURE AUTHENTICATION</div></div><div className="panel-bottom">© World Wide Martial Arts Association <span>•</span> Since 1983</div></div></div>
}

function PageTitle({eyebrow,title,description,action}) { return <div className="page-title-row"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div> }
function Overview({role,students,events,setActive}) {
  return <><PageTitle eyebrow="ASSOCIATION OVERVIEW" title="The warrior's hub." description="Every dojo connected. Every session counted. Every member moving forward." action={<div className="today-chip"><CalendarDays size={16}/> {new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</div>}/>
    <div className="welcome-banner"><div className="banner-text"><span className="banner-kicker">WORLD WIDE MARTIAL ARTS ASSOCIATION</span><h2>ONE TEAM.<br/><em>NO LIMITS.</em></h2><p>Respect the art. Defend the team. Earn every next level.</p><button className="btn light" onClick={()=>setActive('events')}>Explore upcoming events <ChevronRight size={16}/></button></div><div className="banner-symbol">武</div><div className="banner-lines"/></div>
    <div className="stats-grid"><Stat icon={Users} label="Registered members" value={students.length.toString().padStart(2,'0')} note="Association directory" /><Stat icon={CalendarDays} label="Upcoming events" value={events.length.toString().padStart(2,'0')} note="Karate & kick boxing" /><Stat icon={MapPin} label="Active dojos" value="03" note="Training locations" /><Stat icon={Trophy} label="Your access" value={role==='A Level'?'A':role==='B Level'?'B':'MEMBER'} note={role==='A Level'?'Full control':'Member workspace'} /></div>
    <div className="section-heading"><div><h2>Coming up</h2><p>Upcoming association activities</p></div><button className="text-btn" onClick={()=>setActive('events')}>View all <ChevronRight size={15}/></button></div><div className="event-grid">{events.slice(0,3).map(e=><EventCard key={e.id} event={e}/>)}</div>
    <div className="fight-strip"><div className="fight-mark">WW<span>MAA</span></div><div><small>THE ASSOCIATION CODE</small><h2>RESPECT THE ROOTS. <em>OWN THE FUTURE.</em></h2><p>Karate spirit · Kick boxing power · One association family</p></div><span className="fight-kanji">武道</span></div><div className="section-heading"><div><h2>Association values</h2><p>The foundation of every practice</p></div></div><div className="values-grid"><Value n="01" title="Respect" text="Honor your instructors, teammates and the art."/><Value n="02" title="Discipline" text="Consistency builds confidence and capability."/><Value n="03" title="Courage" text="Grow through challenge, together as one team."/></div>
  </>
}
function Stat({icon:Icon,label,value,note}) {return <div className="stat-card"><div className="stat-top"><span className="stat-icon"><Icon size={18}/></span><span className="stat-mark">↗</span></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div></div>}
function EventCard({event}) {return <article className="event-card"><div className={`event-type ${event.type==='Karate'?'karate':'kick'}`}><Swords size={15}/>{event.type}</div><h3>{event.title}</h3><div className="event-meta"><span><CalendarDays size={15}/>{event.date}</span><span><Clock3 size={15}/>{event.time||'Time to be announced'}</span><span><MapPin size={15}/>{event.place}</span></div><div className="event-card-bottom"><span className="event-status"><i/>{event.status}</span><span className="round-arrow"><ChevronRight size={17}/></span></div></article>}
function Value({n,title,text}) {return <div className="value-card"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><div className="value-line"/></div>}
function Students({students,query,setQuery,canManage,isA,setShowStudentForm}) {return <><PageTitle eyebrow="MEMBER DIRECTORY" title="Student details." description="Association member profiles, dojo assignments and current belt levels." action={canManage&&<button className="btn primary" onClick={()=>setShowStudentForm(true)}><Plus size={16}/> Add student</button>}/><div className="panel"><div className="panel-toolbar"><div><h2>Member directory</h2><p>{students.length} profiles shown</p></div><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, ID, dojo..."/></div></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>ASSOCIATION ID</th><th>DOJO</th><th>CURRENT BELT</th><th>TYPE</th>{isA&&<th>ACCESS</th>}</tr></thead><tbody>{students.map(s=><tr key={s.id}><td><div className="member-cell"><span className="member-avatar">{s.name.split(' ').map(x=>x[0]).join('').replace('.','').slice(0,2)}</span><b>{s.name}</b></div></td><td><span className="id-chip">{s.id}</span></td><td>{s.dojo}</td><td><span className="belt-chip">{s.belt}</span></td><td>{s.role}</td>{isA&&<td><span className="access-chip">{s.role==='Sensi'?'B Level':'Member'}</span></td>}</tr>)}</tbody></table>{students.length===0&&<div className="empty-state">No profiles match your search.</div>}</div><div className="table-foot"><Shield size={15}/>{canManage?'B Level can add and view IDs. A Level controls permissions.':'Your profile directory is read-only.'}</div></div></>}

function StudentProfile({session,students,events}) {
  const member = students.find(s => s.id.toLowerCase() === session.id.toLowerCase()) || {id:session.id,name:'Association Member',dojo:'Assigned dojo',belt:'To be updated',role:session.role,style:'Karate'}
  return <><PageTitle eyebrow="MY MEMBER SPACE" title="Your training profile." description="Your personal association information and upcoming training."/><div className="student-profile-hero"><div className="student-profile-avatar">{member.name.split(' ').map(x=>x[0]).join('').replace('.','').slice(0,2)}</div><div><span className="eyebrow">WWMAA MEMBER</span><h2>{member.name}</h2><p>{member.id} · {member.role}</p></div><span className="belt-chip">{member.belt}</span></div><div className="stats-grid"><Stat icon={MapPin} label="Assigned dojo" value={member.dojo.includes(' ') ? member.dojo.split(' ')[0] : member.dojo} note={member.dojo}/><Stat icon={Swords} label="Discipline" value={member.style||'Karate'} note="Association training"/><Stat icon={CalendarDays} label="Upcoming events" value={events.length.toString().padStart(2,'0')} note="See event calendar"/><Stat icon={Shield} label="Member ID" value={member.id} note="Your association identity"/></div><div className="section-heading"><div><h2>Upcoming training</h2><p>Events listed by your association</p></div></div><div className="event-grid">{events.slice(0,3).map(e=><EventCard key={e.id} event={e}/>)}</div></>
}
function StudentAttendance({session}) {
  return <><PageTitle eyebrow="MY TRAINING" title="Attendance record." description="Check your training attendance. Your Sensi or authorized administrator records attendance."/><div className="panel"><div className="panel-toolbar"><div><h2>Attendance</h2><p>Member ID: {session.id}</p></div><span className="demo-tag">PREVIEW</span></div><div className="empty-state"><ClipboardCheck size={26}/><p>Attendance records will appear here once your association connects the shared database.</p></div></div></>
}

function Attendance({students}) {const [marked,setMarked]=useState({});return <><PageTitle eyebrow="TRAINING RECORDS" title="Attendance." description="Mark attendance for your current training session." action={<div className="today-chip"><CalendarDays size={16}/>{new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</div>}/><div className="attendance-banner"><ClipboardCheck size={24}/><div><b>Training attendance</b><p>Triprayar Dojo · Karate · Today’s session</p></div><span>{Object.values(marked).filter(Boolean).length}/{students.length} present</span></div><div className="panel"><div className="panel-toolbar"><div><h2>Member roll call</h2><p>Tap a status to mark attendance in this preview.</p></div><span className="demo-tag">LOCAL PREVIEW</span></div><div className="attendance-list">{students.map(s=><div className="attendance-row" key={s.id}><div className="member-cell"><span className="member-avatar">{s.name.split(' ').map(x=>x[0]).join('').replace('.','').slice(0,2)}</span><div><b>{s.name}</b><small>{s.id} · {s.belt}</small></div></div><button className={`attendance-toggle ${marked[s.id]?'present':''}`} onClick={()=>setMarked({...marked,[s.id]:!marked[s.id]})}>{marked[s.id]?<><Check size={15}/> Present</>:'Mark present'}</button></div>)}</div></div></>}
function Events({events,eventType,setEventType,canManage,setShowEventForm}) {return <><PageTitle eyebrow="ASSOCIATION CALENDAR" title="Events & training." description="Separate event settings for Karate and Kick boxing." action={canManage&&<button className="btn primary" onClick={()=>setShowEventForm(true)}><Plus size={16}/> New event</button>}/><div className="event-controls"><div className="segmented">{['All','Karate','Kick boxing'].map(t=><button key={t} className={eventType===t?'selected':''} onClick={()=>setEventType(t)}>{t==='All'?'All events':t}</button>)}</div><div className="event-settings-note"><Settings size={16}/><span>Each event has its own discipline and settings.</span></div></div><div className="event-grid large">{events.map(e=><EventCard key={e.id} event={e}/>)}</div>{events.length===0&&<div className="empty-state panel">No events in this category yet.</div>}</>}
function Dojos({isA,canManage}) {const [show,setShow]=useState(false);const [name,setName]=useState('');const [dojos,setDojos]=useState([{name:'Triprayar Dojo',place:'Triprayar, Kerala',members:2,lead:'Sensei R.'},{name:'Thrissur Central',place:'Thrissur, Kerala',members:1,lead:'Senpai Sanjay'},{name:'Main Dojo',place:'Association HQ',members:0,lead:'Association office'}]);return <><PageTitle eyebrow="ASSOCIATION LOCATIONS" title="Our dojos." description="Training locations and the instructors who guide each team." action={isA&&<button className="btn primary" onClick={()=>setShow(true)}><Plus size={16}/> New dojo</button>}/>{show&&<form className="inline-add" onSubmit={e=>{e.preventDefault();if(name.trim()){setDojos([...dojos,{name,place:'Location to be updated',members:0,lead:'To be assigned'}]);setName('');setShow(false)}}}><input placeholder="New dojo name" value={name} onChange={e=>setName(e.target.value)} required/><button className="btn primary">Add dojo</button><button type="button" className="btn secondary" onClick={()=>setShow(false)}>Cancel</button></form>}<div className="dojo-grid">{dojos.map((d,i)=><article className="dojo-card" key={d.name}><div className="dojo-card-top"><div className="dojo-icon"><Building2 size={22}/></div><span className="dojo-number">DOJO / 0{i+1}</span></div><h2>{d.name}</h2><p><MapPin size={15}/>{d.place}</p><div className="dojo-details"><div><small>MEMBERS</small><b>{d.members.toString().padStart(2,'0')}</b></div><div><small>INSTRUCTOR</small><b>{d.lead}</b></div></div><div className="dojo-foot"><span><i/> Listed dojo</span>{canManage&&<span className="access-chip">{isA?'Manage':'View only'}</span>}</div></article>)}</div></>}
function Control({isA,isB,students}) {
  const [ids, setIds] = useState([
    {id:'WWMAA-ADMIN-001',name:'Association Administrator',role:'A Level',status:'Active',passwordSet:true},
    {id:'WW-1001',name:'Arjun K.',role:'Student',status:'Active',passwordSet:true},
    {id:'SN-0201',name:'Sanjay P.',role:'Senpai',status:'Active',passwordSet:false}
  ])
  const [passwordTarget, setPasswordTarget] = useState(null)
  const [temporaryPassword, setTemporaryPassword] = useState('')
  const [idForm, setIdForm] = useState({id:'',name:'',role:'Student'})
  const [saved, setSaved] = useState('')
  const [karateSettings, setKarateSettings] = useState({attendance:true,registration:true,results:false})
  const [kickSettings, setKickSettings] = useState({attendance:true,registration:true,results:false})
  const [activeSettings, setActiveSettings] = useState('Karate')
  const [showIdForm, setShowIdForm] = useState(false)
  const [searchId, setSearchId] = useState('')
  const [editingRole, setEditingRole] = useState(null)
  const [editingRoleValue, setEditingRoleValue] = useState('Student')
  const shownIds = ids.filter(x => (x.id+' '+x.name+' '+x.role).toLowerCase().includes(searchId.toLowerCase()))
  const settings = activeSettings === 'Karate' ? karateSettings : kickSettings
  const setSettings = activeSettings === 'Karate' ? setKarateSettings : setKickSettings
  function addLogin(e) {
    e.preventDefault()
    if (!(isA||isB) || !idForm.id.trim() || !idForm.name.trim()) return
    if (ids.some(x => x.id.toLowerCase() === idForm.id.trim().toLowerCase())) {
      setSaved('That login ID already exists.')
      return
    }
    setIds(prev => [...prev, {...idForm, id:idForm.id.trim().toUpperCase(), status:'Active', passwordSet:false}])
    setIdForm({id:'',name:'',role:'Student'})
    setShowIdForm(false)
    setSaved('Login ID created in this browser preview.')
  }
  function saveRole(id) {
    if (!(isA||isB)) return
    setIds(prev => prev.map(x => x.id === id ? {...x, role:editingRoleValue} : x))
    setEditingRole(null)
    setSaved('Access level updated in this browser preview.')
  }
  return <>
    <PageTitle eyebrow="ADMINISTRATION" title="Control panel." description="A Level and B Level have full administrative control over member IDs, roles, events, dojos and association settings." />
    <div className="control-alert"><Shield size={20}/><div><b>{isA?'A Level · Full control':'B Level · Full control'}</b><p>Both A Level and B Level can create login IDs, assign member roles, add and edit students, manage dojos, create events and configure all association settings. Passwords remain private and cannot be viewed by either admin level.</p></div></div>
    {saved && <div className="notice"><Check size={16}/>{saved}<button onClick={()=>setSaved('')}><X size={15}/></button></div>}
    <div className="control-grid">
      <ControlTile icon={KeyRound} title="Login ID management" text="Create and review member login IDs. Passwords are never displayed." status="Create + view + manage"  />
      <ControlTile icon={Users} title="Access roles" text="Assign Student, Senpai, Sensi, B Level or A Level." status="Editable"  />
      <ControlTile icon={CalendarDays} title="Event configuration" text="Maintain independent Karate and Kick boxing settings." status="Interactive" />
      <ControlTile icon={Building2} title="Association settings" text="Control member access and event registration options." status="Full control"  />
    </div>
    <div className="panel control-section">
      <div className="panel-toolbar"><div><h2>Login ID manager</h2><p>{shownIds.length} IDs in this preview. Both A Level and B Level can create IDs and assign roles.</p></div>{(isA||isB)&&<button className="btn primary" onClick={()=>setShowIdForm(!showIdForm)}><Plus size={16}/>{showIdForm?'Close form':'Create login ID'}</button>}</div>
      {showIdForm && (isA||isB) && <form className="form-grid control-form" onSubmit={addLogin}>
        <label>Login ID<input required value={idForm.id} onChange={e=>setIdForm({...idForm,id:e.target.value})} placeholder="WW-1005"/></label>
        <label>Member name<input required value={idForm.name} onChange={e=>setIdForm({...idForm,name:e.target.value})} placeholder="Full name"/></label>
        <label>Access role<select value={idForm.role} onChange={e=>setIdForm({...idForm,role:e.target.value})}>{['Student','Senpai','Sensi','B Level','A Level'].map(x=><option key={x}>{x}</option>)}</select></label>
        <div className="form-actions"><button className="btn primary"><Plus size={16}/> Create ID</button></div>
      </form>}
      <div className="panel-toolbar id-search-toolbar"><div className="search-box"><Search size={17}/><input value={searchId} onChange={e=>setSearchId(e.target.value)} placeholder="Search login IDs..."/></div><span className="demo-tag">BROWSER PREVIEW</span></div>
      <div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>LOGIN ID</th><th>ACCESS ROLE</th><th>STATUS</th><th>PASSWORD</th>{(isA||isB)&&<th>ACTIONS</th>}</tr></thead><tbody>{shownIds.map(x=><tr key={x.id}><td>{x.name}</td><td><span className="id-chip">{x.id}</span></td><td>{editingRole===x.id&&isA?<select className="table-select" value={editingRoleValue} onChange={e=>setEditingRoleValue(e.target.value)}>{['Student','Senpai','Sensi','B Level','A Level'].map(r=><option key={r}>{r}</option>)}</select>:<span className="access-chip">{x.role}</span>}</td><td><span className="event-status"><i/>{x.status}</span></td><td><span className="access-chip">{x.passwordSet?'Set':'Needs setup'}</span></td>{(isA||isB)&&<td>{editingRole===x.id?<div className="row-actions"><button className="text-btn" onClick={()=>saveRole(x.id)}>Save</button><button className="text-btn muted" onClick={()=>setEditingRole(null)}>Cancel</button></div>:<button className="text-btn" onClick={()=>{setEditingRole(x.id);setEditingRoleValue(x.role)}}><Pencil size={13}/> Edit role</button>}</td>}</tr>)}</tbody></table>{shownIds.length===0&&<div className="empty-state">No login IDs match your search.</div>}</div>
    </div>
    <div className="panel control-section">
      <div className="panel-toolbar"><div><h2>Event settings</h2><p>Karate and Kick boxing settings are independent.</p></div><Settings size={19} color="#e3545f"/></div>
      <div className="event-settings-body">
        <div className="segmented"><button className={activeSettings==='Karate'?'selected':''} onClick={()=>setActiveSettings('Karate')}>Karate</button><button className={activeSettings==='Kick boxing'?'selected':''} onClick={()=>setActiveSettings('Kick boxing')}>Kick boxing</button></div>
        <div className="settings-list">
          {[['attendance','Attendance tracking','Allow instructors to mark member attendance.'],['registration','Event registration','Allow members to register for this event type.'],['results','Results and grading','Enable results / grading records for this discipline.']].map(([key,title,desc])=><label className="setting-row" key={key}><span><b>{title}</b><small>{desc}</small></span><button type="button" role="switch" aria-checked={settings[key]} className={`switch ${settings[key]?'on':''}`} onClick={()=>setSettings(prev=>({...prev,[key]:!prev[key]}))}><i/></button></label>)}
        </div>
        <div className="settings-save-row"><span>Changes apply to <b>{activeSettings}</b> in this browser preview.</span><button className="btn primary" onClick={()=>setSaved(`${activeSettings} settings saved in this browser preview.`)}><Check size={15}/> Save settings</button></div>
      </div>
    </div>
    <div className="panel security-panel"><div className="security-icon"><CircleHelp size={20}/></div><div><h3>Password privacy policy</h3><p>A Level and B Level cannot view, reveal, edit or reset member passwords. In production, store only salted password hashes and provide a secure self-service password-change flow for the account holder. A Level may disable an account or issue a one-time reset invitation without ever seeing the existing password.</p></div></div>
    <div className="panel security-panel"><div className="security-icon"><Shield size={20}/></div><div><h3>Prototype security notice</h3><p>This is a visual frontend demo. The access rules shown here are not secure server-side enforcement and data is local to this browser. Do not use real member passwords until production authentication and database permissions are configured.</p></div></div>
    <div className="panel"><div className="panel-toolbar"><div><h2>Access overview</h2><p>Planned capabilities by role</p></div></div><div className="role-matrix"><div className="matrix-row matrix-head"><span>CAPABILITY</span><span>MEMBER</span><span>B LEVEL</span><span>A LEVEL</span></div>{[['View member IDs','—','✓','✓'],['Create login IDs','—','✓','✓'],['Change login roles','—','✓','✓'],['Add/edit students and dojos','—','✓','✓'],['Configure event settings','—','✓','✓'],['View existing passwords','—','—','—'],['Set/reset member password','—','✓','✓'],['Full association control','—','✓','✓']].map(row=><div className="matrix-row" key={row[0]}>{row.map((v,i)=><span key={i} className={i===0?'matrix-label':''}>{v}</span>)}</div>)}</div></div>
  </>
}
function ControlTile({icon:Icon,title,text,status}) {return <div className="control-tile"><div className="control-tile-icon"><Icon size={19}/></div><div><h3>{title}</h3><p>{text}</p><span className="access-chip">{status}</span></div></div>}
function Modal({title,close,children}) {return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><div className="modal-head"><div><div className="eyebrow">ASSOCIATION PORTAL</div><h2>{title}</h2></div><button className="icon-btn" onClick={close}><X size={19}/></button></div>{children}</div></div>}

createRoot(document.getElementById('root')).render(<App />)
