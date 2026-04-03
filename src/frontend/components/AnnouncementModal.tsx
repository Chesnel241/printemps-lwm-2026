'use client'

import { Announcement } from '@/shared/types'
import { Lang, tr } from '@/frontend/lib/i18n'

type Props = {
  announcement: Announcement | null
  onClose: () => void
  lang: Lang
}

const typeStyles: Record<string, { tag: string; cls: string }> = {
  info:     { tag: '📘 Info',     cls: 'bg-blue-l text-blue' },
  urgent:   { tag: '🔴 Urgent',  cls: 'bg-red-l text-red' },
  pratique: { tag: '🌿 Pratique', cls: 'bg-sage-l text-sage' },
}

export default function AnnouncementModal({ announcement, onClose, lang }: Props) {
  const T = (key: string) => tr(key, lang)

  if (!announcement) return null

  const style = typeStyles[announcement.type] || typeStyles.info
  const locale = lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-GB' : 'fr-FR'
  const date = new Date(announcement.createdAt)
  const timeStr = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  const dateStr = date.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div
      className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-end"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-t-[28px] w-full p-6 pb-8 animate-modal max-h-[80%] overflow-y-auto">
        <div className="w-10 h-1 rounded-full bg-line mx-auto mb-5" />
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${style.cls}`}>
            {style.tag}
          </span>
          <span className="text-[11px] text-pale">{dateStr} · {timeStr}</span>
        </div>
        <h3 className="text-[18px] font-bold text-ink leading-snug mb-3">
          {announcement.title}
        </h3>
        <div className="text-[14px] text-muted leading-relaxed whitespace-pre-line">
          {announcement.body}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-ink text-white rounded-xl font-semibold text-sm hover:bg-ink2 transition-colors"
        >
          {T('ann.close')}
        </button>
      </div>
    </div>
  )
}
