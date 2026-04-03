import './globals.css'
import { Nunito, Lora } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', style: ['normal', 'italic'] })

export const metadata = {
  title: 'Retraite Printemps 2026',
  description: 'Application pour la Retraite de Printemps 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${nunito.variable} ${lora.variable}`}>
      <body>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-[min(412px,100vw)] h-[min(892px,100vh)] bg-bg rounded-[min(46px,5vw)] overflow-hidden relative flex flex-col shadow-[0_0_0_1.5px_#333,0_0_0_5px_#181818,0_48px_120px_rgba(0,0,0,.8)]">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
