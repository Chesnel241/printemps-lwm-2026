import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Lang, tr } from '@/frontend/lib/i18n'

interface QRCodeShareProps {
  lang: Lang
}

export default function QRCodeShare({ lang }: QRCodeShareProps) {
  const T = (key: string) => tr(key, lang)
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://printemps-lwm-2026.vercel.app'

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-line shadow-sm animate-up">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-ink mb-2">{T('share.title')}</h3>
        <p className="text-sm text-muted px-4 line-clamp-3">{T('share.subtitle')}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border-4 border-primary-l shadow-inner mb-6 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
        <QRCodeSVG 
          value={appUrl} 
          size={200}
          level="H"
          includeMargin={false}
          imageSettings={{
            src: "/logo-lwm.jpeg",
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Retraite LWM 2026',
                text: 'Rejoins-nous pour la retraite de printemps !',
                url: appUrl,
              })
            } else {
              navigator.clipboard.writeText(appUrl);
              alert(T('share.copied'));
            }
          }}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span>🔗</span> {T('share.link')}
        </button>
        
        <p className="text-[10px] text-center text-muted font-medium uppercase tracking-wider">
          {appUrl.replace('https://', '')}
        </p>
      </div>
    </div>
  )
}
