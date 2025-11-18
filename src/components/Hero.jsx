import React from 'react'
import Spline from '@splinetool/react-spline'
import { ShieldCheck, Wallet, ArrowRight } from 'lucide-react'

export default function Hero({ onConnect }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/DtQLjBkD1UpownGS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-300 mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>Trustworthy Solana Claim Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Solana keeps your unclaimed SOL — you can safely recover it.
            </h1>
            <p className="mt-4 text-emerald-100/90 text-lg">
              Simple, transparent, and verifiable. Connect your wallet to see claimable accounts and recover in seconds.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-emerald-200/90">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 px-3 py-2 text-sm">
                Service fee: 1% — shown upfront
              </div>
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 px-3 py-2 text-sm">
                Optional donation at checkout
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <button onClick={onConnect} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition px-5 py-3 font-medium">
                <Wallet className="h-5 w-5" />
                Connect Wallet
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/50 to-slate-950/90" />
    </section>
  )
}
