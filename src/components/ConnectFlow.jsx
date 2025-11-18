import React, { useEffect, useState } from 'react'
import { Wallet, CheckCircle2, ArrowRight } from 'lucide-react'

// Very light wallet detection guidance; in a real app integrate @solana/wallet-adapter
export default function ConnectFlow() {
  const [connected, setConnected] = useState(false)
  const [wallet, setWallet] = useState('')
  const [accounts, setAccounts] = useState([])
  const [total, setTotal] = useState(0)

  const phantomAvailable = typeof window !== 'undefined' && window.solana && window.solana.isPhantom
  const solflareAvailable = typeof window !== 'undefined' && window.solflare

  const connect = async () => {
    try {
      if (phantomAvailable) {
        const resp = await window.solana.connect()
        const pubkey = resp.publicKey?.toString?.() || ''
        setWallet(pubkey)
        // Simulate detection of claimable accounts for demo
        const demo = [
          { address: 'HfK3...1xQ', amount: 0.42 },
          { address: '3A8p...9Lm', amount: 1.03 }
        ]
        setAccounts(demo)
        setTotal(demo.reduce((s, a) => s + a.amount, 0))
        setConnected(true)
      } else if (solflareAvailable) {
        await window.solflare.connect()
        const pubkey = window.solflare.publicKey?.toString?.() || ''
        setWallet(pubkey)
        const demo = [
          { address: '3xDz...PPd', amount: 0.27 },
          { address: '9Lm2...aaQ', amount: 0.88 }
        ]
        setAccounts(demo)
        setTotal(demo.reduce((s, a) => s + a.amount, 0))
        setConnected(true)
      } else {
        alert('Install Phantom or Solflare to continue')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const claim = async () => {
    try {
      const API = import.meta.env.VITE_BACKEND_URL || ''
      const body = {
        wallet,
        accounts: accounts.map(a => a.address),
        total_amount_sol: total,
        fee_percent: 1.0,
      }
      await fetch(`${API}/api/claims`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      alert('Claim submitted! Check activity feed for updates.')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-violet-400/20 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3 text-violet-200">
            <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><span>1</span></div>
            Connect
          </div>
          <p className="mt-2 text-violet-200/70 text-sm">Fast connect with Phantom or Solflare.</p>
          <button onClick={connect} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-500 text-slate-900 hover:bg-violet-400 transition px-4 py-2 font-medium">
            <Wallet className="h-5 w-5" /> Connect Wallet
          </button>
          {connected && (
            <div className="mt-3 text-xs text-violet-300 break-all">{wallet}</div>
          )}
        </div>
        <div className="rounded-2xl border border-violet-400/20 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3 text-violet-200">
            <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><span>2</span></div>
            Select
          </div>
          <p className="mt-2 text-violet-200/70 text-sm">Automatically detect claimable accounts.</p>
          <ul className="mt-3 space-y-2">
            {accounts.map((a, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border border-violet-400/20 px-3 py-2 text-violet-100">
                <span className="font-mono">{a.address}</span>
                <span>{a.amount} SOL</span>
              </li>
            ))}
            {accounts.length === 0 && <li className="text-violet-200/60 text-sm">Connect wallet to view</li>}
          </ul>
        </div>
        <div className="rounded-2xl border border-violet-400/20 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3 text-violet-200">
            <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><span>3</span></div>
            Claim
          </div>
          <p className="mt-2 text-violet-200/70 text-sm">Fee: 1% — optional donation at checkout.</p>
          <div className="mt-4 text-white text-2xl font-semibold">{total.toFixed(2)} SOL</div>
          <button onClick={claim} disabled={!connected || accounts.length === 0} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-500 text-slate-900 hover:bg-violet-400 disabled:opacity-50 transition px-4 py-2 font-medium">
            Claim Now <ArrowRight className="h-5 w-5" />
          </button>
          {connected && (
            <div className="mt-3 inline-flex items-center gap-2 text-violet-300 text-sm">
              <CheckCircle2 className="h-4 w-4" /> Wallet connected — real-time feedback enabled
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
