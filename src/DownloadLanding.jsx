import React from 'react'
import { Download, Smartphone, Apple, ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react'
import './download-landing.css'

const APP_URL = '/worldwidemartalart'
const APK_URL = '/downloads/wwmaa-webreader.apk'

export default function DownloadLanding() {
  return <main className="download-home">
    <div className="download-bg-glow" aria-hidden="true" />
    <header className="download-header">
      <a className="download-brand" href="/" aria-label="WWMAA home">
        <img src="/logo.png" alt="WWMAA logo" onError={e => { e.currentTarget.style.display = 'none' }} />
        <span><b>WWMAA</b><small>WORLD WIDE MARTIAL ARTS ASSOCIATION</small></span>
      </a>
      <span className="download-version">WEBREADER · V12</span>
    </header>

    <section className="download-hero">
      <div className="download-kicker"><span /> OFFICIAL APP DOWNLOAD CENTRE</div>
      <h1>Your association.<br/><em>Always with you.</em></h1>
      <p className="download-lead">Get the WWMAA WebReader on your device. Choose Android download or open the web app on iPhone and add it to your Home Screen.</p>
      <div className="download-cards">
        <article className="download-card android-card">
          <div className="platform-icon"><Smartphone size={25}/></div>
          <div className="platform-label">ANDROID</div>
          <h2>Download the APK</h2>
          <p>Install the WWMAA WebReader on a compatible Android phone.</p>
          <a className="download-action primary-action" href={APK_URL} download>
            <Download size={18}/> Download Android APK <ArrowUpRight size={17}/>
          </a>
          <small className="download-note">Only install APKs you trust. Android may ask you to approve installation from your browser.</small>
        </article>
        <article className="download-card ios-card">
          <div className="platform-icon apple-icon"><Apple size={25}/></div>
          <div className="platform-label">IPHONE / IPAD</div>
          <h2>Use on iOS</h2>
          <p>iOS does not install Android APK files. Open the WebReader in Safari and add it to your Home Screen.</p>
          <a className="download-action secondary-action" href={APP_URL}>
            Open WWMAA WebReader <ExternalLink size={17}/>
          </a>
          <ol className="ios-steps">
            <li>Open the app in <b>Safari</b>.</li>
            <li>Tap Safari’s <b>Share</b> button.</li>
            <li>Choose <b>Add to Home Screen</b>, then tap Add.</li>
          </ol>
        </article>
      </div>
      <div className="download-security"><ShieldCheck size={17}/><span>Use the official WWMAA link. Never share your login password with anyone.</span></div>
    </section>
    <footer className="download-footer"><span>© {new Date().getFullYear()} WWMAA</span><span>Train with discipline. Grow with respect.</span><a href={APP_URL}>Open WebReader <ArrowUpRight size={13}/></a></footer>
  </main>
}
