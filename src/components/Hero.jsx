import React, { useEffect, useMemo, useState } from 'react'
import { Coins, Globe, Wallet, ArrowRight, ToggleLeft } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Hero({ onConnect }) {
  const [language, setLanguage] = useState('en')
  const [mode, setMode] = useState('easy') // 'easy' | 'advanced'
  const [txs, setTxs] = useState([])

  useEffect(() => {
    fetch(`${API}/api/activity`).then(r => r.json()).then((data) => {
      setTxs(Array.isArray(data) ? data.slice(0, 5) : [])
    }).catch(() => {})
  }, [])

  const modeLabel = useMemo(() => mode === 'easy' ? 'Easy' : 'Advanced', [mode])

  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 pb-10 md:pb-14">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-emerald-200">
              <Coins className="h-5 w-5 text-emerald-300" />
              <span className="font-medium">Cashout SOL</span>
            </div>
            <div className="hidden md:block h-6 w-px bg-emerald-400/20" />
            <label className="inline-flex items-center gap-2 text-emerald-200/90 text-sm border border-emerald-400/20 rounded-xl px-3 py-2 bg-slate-900/50">
              <Globe className="h-4 w-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent outline-none text-emerald-100"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
              </select>
            </label>
          </div>

          <button
            onClick={() => setMode(mode === 'easy' ? 'advanced' : 'easy')}
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-slate-900/60 hover:bg-slate-900/40 px-3 py-2 text-sm text-emerald-100"
          >
            <span className="hidden sm:inline text-emerald-300/80">Mode:</span>
            <span className="font-semibold text-white">{modeLabel}</span>
            <ToggleLeft className={`h-5 w-5 transition-transform ${mode === 'advanced' ? 'rotate-180 text-emerald-300' : 'text-emerald-400'}`} />
          </button>
        </div>

        {/* Direct headline */}
        <div className="mt-8 md:mt-10">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Recover your unclaimed SOL — fast, transparent, verifiable.
          </h1>
          <p className="mt-3 text-emerald-100/90 text-base md:text-lg">
            Connect your wallet, review claimable accounts, and cash out in seconds. Fee 1% — optional donation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onConnect}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition px-5 py-3 font-medium"
            >
              <Wallet className="h-5 w-5" />
              Connect Wallet
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="text-sm text-emerald-200/80">No surprises: fee shown upfront</div>
          </div>
        </div>

        {/* Transactions preview below the button */}
        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-slate-900/60">
          <div className="px-5 py-3 border-b border-emerald-400/10 flex items-center justify-between">
            <div className="text-emerald-200">Recent transactions</div>
            <div className="text-xs text-emerald-200/60">Live preview</div>
          </div>
          <ul className="divide-y divide-emerald-400/10">
            {txs.map((it, idx) => (
              <li key={idx} className="px-5 py-3 flex items-center justify-between text-emerald-100">
                <span className="font-mono text-sm">{(it.wallet || '').slice(0, 4)}...{(it.wallet || '').slice(-4)}</span>
                <span className="text-white font-medium">{it.amount_sol} SOL</span>
                <span className="text-xs text-emerald-200/70">{new Date(it.timestamp).toLocaleString()}</span>
              </li>
            ))}
            {txs.length === 0 && (
              <li className="px-5 py-6 text-center text-emerald-200/70">No transactions yet</li>
            )}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-950" />
    </section>
  )
}
