import React from 'react'
import { MessageCircle, Users, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-violet-400/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-violet-200/80 text-sm">Built for transparency. Audit everything in real-time.</div>
        <div className="flex items-center gap-3">
          <a href="https://t.me/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 px-3 py-2 text-violet-200 hover:bg-violet-400/10">
            <MessageCircle className="h-4 w-4" /> Telegram
          </a>
          <a href="https://discord.com/invite/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 px-3 py-2 text-violet-200 hover:bg-violet-400/10">
            <Users className="h-4 w-4" /> Discord
          </a>
          <a href="https://x.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 px-3 py-2 text-violet-200 hover:bg-violet-400/10">
            <Twitter className="h-4 w-4" /> X
          </a>
        </div>
      </div>
    </footer>
  )
}
