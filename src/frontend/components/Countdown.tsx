'use client'

import { useState, useEffect } from 'react'
import { Lang, tr } from '@/frontend/lib/i18n'

const SESSIONS = [
  // Samedi 4 avril
  { n: 'Présentation équipe de mission',   d: new Date('2026-04-04T15:30:00') },
  { n: 'Sermon 1 — p. Oh',                d: new Date('2026-04-04T16:00:00') },
  { n: 'Dîner (Villebon)',                 d: new Date('2026-04-04T18:00:00') },
  { n: 'Sermon 2 — p. Lee',               d: new Date('2026-04-04T19:30:00') },
  // Dimanche 5 avril
  { n: 'QT — Quiet Time',                 d: new Date('2026-04-05T06:00:00') },
  { n: 'Petit-déjeuner',                  d: new Date('2026-04-05T07:00:00') },
  { n: 'Sermon 3 — p. Hermann',           d: new Date('2026-04-05T10:00:00') },
  { n: 'Déjeuner',                        d: new Date('2026-04-05T12:00:00') },
  { n: 'Sermon 4 — p. Lee',               d: new Date('2026-04-05T13:00:00') },
  { n: 'Sermon 5 — p. Hermann',           d: new Date('2026-04-05T15:00:00') },
  { n: 'Dîner (Villebon)',                 d: new Date('2026-04-05T18:00:00') },
  { n: 'Communion et entretiens',          d: new Date('2026-04-05T18:00:00') },
  // Lundi 6 avril
  { n: 'QT — Quiet Time',                 d: new Date('2026-04-06T06:00:00') },
  { n: 'Petit-déjeuner',                  d: new Date('2026-04-06T07:00:00') },
  { n: 'Sermon 6 — p. Oh · Sainte Cène',  d: new Date('2026-04-06T09:00:00') },
  { n: 'Déjeuner de clôture',             d: new Date('2026-04-06T11:30:00') },
  { n: 'Fin de la retraite — Départ',     d: new Date('2026-04-06T12:30:00') },
]

export default function Countdown({ lang }: { lang: Lang }) {
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' })
  const [sessionName, setSessionName] = useState('')
  const [ended, setEnded] = useState(false)
  const T = (key: string) => tr(key, lang)

  useEffect(() => {
    function update() {
      const now = new Date()
      const sorted = [...SESSIONS].sort((a, b) => a.d.getTime() - b.d.getTime())
      const next = sorted.find(s => s.d > now)
      if (!next) { setEnded(true); setSessionName(T('countdown.ended')); return }
      setSessionName(next.n)
      const diff = Math.max(0, Math.floor((next.d.getTime() - now.getTime()) / 1000))
      setTimeLeft({
        h: String(Math.floor(diff / 3600)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600) / 60)).padStart(2, '0'),
        s: String(diff % 60).padStart(2, '0'),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [lang])

  return (
    <div className="bg-gradient-to-b from-[#0A1628] to-[#153463] rounded-2xl p-5 text-center animate-up">
      <div className="text-[11px] font-bold uppercase tracking-[2px] text-sky-b mb-2">
        {T('countdown.next')}
      </div>
      <div className="text-white/90 text-sm font-semibold mb-4">{sessionName}</div>
      {ended ? (
        <div className="text-sky-b text-lg font-bold">{T('countdown.endedSub')}</div>
      ) : (
        <div className="flex justify-center gap-3">
          {[
            { val: timeLeft.h, labelKey: 'countdown.hours' },
            { val: timeLeft.m, labelKey: 'countdown.minutes' },
            { val: timeLeft.s, labelKey: 'countdown.seconds' },
          ].map((item) => (
            <div key={item.labelKey} className="bg-white/10 backdrop-blur rounded-xl w-[72px] py-3">
              <div className="text-[28px] font-extrabold text-white leading-none font-mono">{item.val}</div>
              <div className="text-[9px] uppercase tracking-[1px] text-pale mt-1">{T(item.labelKey)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
