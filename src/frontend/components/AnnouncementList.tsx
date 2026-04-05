'use client'

import { Announcement } from '@/shared/types'
import { Lang, tr } from '@/frontend/lib/i18n'

const typeStyles: Record<string, { tag: string; cls: string; bg: string; border: string }> = {
  info:     { tag: '📘 Info',     cls: 'text-blue',  bg: 'bg-blue-l',  border: 'border-blue/10' },
  urgent:   { tag: '🔴 Urgent',  cls: 'text-red',   bg: 'bg-red-l',   border: 'border-red/10' },
  pratique: { tag: '🌿 Pratique', cls: 'text-sage',  bg: 'bg-sage-l',  border: 'border-sage/10' },
}

type Props = {
  announcements: Announcement[]
  onOpen: (ann: Announcement) => void
  readIds: Set<string>
  lang: Lang
}

export default function AnnouncementList({ announcements, onOpen, readIds, lang }: Props) {
  const T = (key: string) => tr(key, lang)

  if (!announcements.length) {
    return (
      <div className="text-center py-10 text-muted text-sm">
        {T('ann.none')}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {announcements.map((ann, i) => {
        const style = typeStyles[ann.type] || typeStyles.info
        const isUnread = !readIds.has(ann.id)
        const date = new Date(ann.createdAt)
        const timeStr = date.toLocaleTimeString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-GB' : 'fr-FR', { hour: '2-digit', minute: '2-digit' })
        const dateStr = date.toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-GB' : 'fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })

        const title = lang === 'ko' ? ann.titleKo : lang === 'zh' ? ann.titleZh : lang === 'en' ? ann.titleEn : ann.titleFr
        const body = lang === 'ko' ? ann.bodyKo : lang === 'zh' ? ann.bodyZh : lang === 'en' ? ann.bodyEn : ann.bodyFr

        return (
          <div
            key={ann.id}
            onClick={() => onOpen(ann)}
            className={`${style.bg} border ${style.border} rounded-2xl p-4 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.98] animate-up`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-bold uppercase tracking-wide ${style.cls}`}>
                {style.tag}
              </span>
              <div className="flex items-center gap-1.5">
                {isUnread && (
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                )}
                <span className="text-[11px] text-pale">{dateStr} · {timeStr}</span>
              </div>
            </div>
            <div className="text-[14px] font-bold text-ink">{title || ann.titleFr}</div>
            <div className="text-[12px] text-muted mt-1 line-clamp-2">{body || ann.bodyFr}</div>
          </div>
        )
      })}
    </div>
  )
}
