import React from 'react'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import ActivityFeed from './components/ActivityFeed'
import ConnectFlow from './components/ConnectFlow'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-violet-50">
      <Hero onConnect={() => {
        const el = document.getElementById('connect-section')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }} />
      <Metrics />
      <div id="connect-section"><ConnectFlow /></div>
      <ActivityFeed />
      <Footer />
    </div>
  )
}

export default App
