import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Metrics() {
  const [metrics, setMetrics] = useState({ total_sol_recovered: 0, total_accounts_claimed: 0, updated_at: '' })

  useEffect(() => {
    fetch(`${API}/api/metrics`).then(r => r.json()).then(setMetrics).catch(() => {})
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/60 p-6">
          <div className="text-sm text-emerald-300/80">TOTAL SOL RECOVERED</div>
          <div className="mt-2 text-4xl font-semibold text-white">{metrics.total_sol_recovered.toLocaleString(undefined, { maximumFractionDigits: 2 })} SOL</div>
          <div className="mt-2 text-xs text-emerald-200/60">Updated {new Date(metrics.updated_at || Date.now()).toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/60 p-6">
          <div className="text-sm text-emerald-300/80">TOTAL ACCOUNTS CLAIMED</div>
          <div className="mt-2 text-4xl font-semibold text-white">{metrics.total_accounts_claimed.toLocaleString()}</div>
          <div className="mt-2 text-xs text-emerald-200/60">Verified on-chain</div>
        </div>
      </div>
    </section>
  )
}
