'use client'

import { Participant } from '@/shared/types'

const bgColors: Record<string, string> = {
  paris: '#DBEAFE',
  bourget: '#D1FAE5',
  invite: '#FEF3C7',
}
const textColors: Record<string, string> = {
  paris: '#1E3A8A',
  bourget: '#065F46',
  invite: '#92400E',
}
const labels: Record<string, string> = {
  paris: '⛪ Paris',
  bourget: '🕊️ Bourget',
  invite: '🌿 Invité',
}

export default function ParticipantList({ participants }: { participants: Participant[] }) {
  if (!participants.length) {
    return <div className="text-center text-muted py-8 text-sm">Chargement…</div>
  }

  return (
    <div className="flex flex-col gap-1">
      {participants.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-warm/60 transition-colors"
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: bgColors[p.church] || '#eee',
              color: textColors[p.church] || '#666',
            }}
          >
            {p.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-ink truncate">{p.name}</div>
            <div className="text-[11px] text-muted">{labels[p.church] || p.church}</div>
          </div>

          {/* Room */}
          <div
            className={`text-[12px] font-bold px-2 py-0.5 rounded-md ${
              p.room
                ? 'bg-gold-l text-gold'
                : 'bg-line text-pale'
            }`}
          >
            {p.room || '—'}
          </div>
        </div>
      ))}
    </div>
  )
}
