'use client'

import { useEffect } from 'react'
import { Lang, tr } from '@/frontend/lib/i18n'

type ToastProps = {
  title: string
  body: string
  visible: boolean
  onClose: () => void
  lang: Lang
}

export default function Toast({ title, body, visible, onClose, lang }: ToastProps) {
  const T = (key: string) => tr(key, lang)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="absolute top-4 left-3 right-3 z-50 animate-drop">
      <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,.18)] p-3.5 flex gap-3 items-start border border-line">
        <div className="w-9 h-9 rounded-lg bg-gold-l flex items-center justify-center text-lg shrink-0">
          ⛪
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[1px] text-muted">
            {T('toast.header')}
          </div>
          <div className="text-[13px] font-bold text-ink mt-0.5 truncate">{title}</div>
          <div className="text-[12px] text-muted mt-0.5 line-clamp-2">{body}</div>
        </div>
      </div>
    </div>
  )
}
