import React, { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function AddressFrag({ value = '' }) {
  if (!value) return null
  return <span className="font-mono">{value.slice(0, 4)}...{value.slice(-4)}</span>
}

export default function ActivityFeed() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${API}/api/activity`).then(r => r.json()).then(setItems).catch(() => {})
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-violet-400/20 bg-slate-900/60">
        <div className="px-6 py-4 border-b border-violet-400/10 flex items-center justify-between">
          <h3 className="text-violet-200">Public Activity (auditable)</h3>
          <span className="text-xs text-violet-200/60">Live preview</span>
        </div>
        <ul className="divide-y divide-violet-400/10">
          {items.map((it, idx) => (
            <li key={idx} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-violet-400/80" />
                <div>
                  <div className="text-white">
                    <AddressFrag value={it.wallet} /> recovered <span className="text-violet-300 font-medium">{it.amount_sol} SOL</span>
                  </div>
                  <div className="text-xs text-violet-200/60">{new Date(it.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <a href={it.solscan_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-200">
                View on Solscan <ExternalLink className="h-4 w-4" />
              </a>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-6 py-10 text-center text-violet-200/70">No activity yet</li>
          )}
        </ul>
      </div>
    </section>
  )
}
