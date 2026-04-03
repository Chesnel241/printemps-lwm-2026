'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Participant, Announcement } from '@/shared/types'
import { ApiClient } from '@/frontend/lib/api-client'
import { Lang, LANG_LABELS, tr } from '@/frontend/lib/i18n'
import Countdown from '@/frontend/components/Countdown'
import ParticipantList from '@/frontend/components/ParticipantList'
import AnnouncementList from '@/frontend/components/AnnouncementList'
import AnnouncementModal from '@/frontend/components/AnnouncementModal'
import FloorPlan from '@/frontend/components/FloorPlan'
import Toast from '@/frontend/components/Toast'

type Screen = 'login' | 'room' | 'app' | 'admin'
type Tab = 'annonces' | 'planning' | 'plan' | 'infos'

/* ── PLANNING DATA ── */
const PLANNING_KEYS = ['planning.sat', 'planning.sun', 'planning.mon'] as const
const PLANNING_ITEMS = [
  // ── SAMEDI 4 AVRIL ──
  [
    { time: '06:00', label: 'QT — Quiet Time', icon: '🙏' },
    { time: '07:00', label: 'Petit-déjeuner (Logement)', icon: '☕' },
    { time: '12:00', label: 'Départ du logement → Villebon', icon: '🚌' },
    { time: '14:00', label: 'Entrée au Centre de Villebon', icon: '🏛️' },
    { time: '14:00', label: 'Déjeuner (resto)', icon: '🍽️' },
    { time: '15:30', label: 'Présentation de l\'équipe de mission', icon: '🌍' },
    { time: '16:00', label: 'Sermon 1 — p. Oh (16h–18h)', icon: '📖' },
    { time: '18:00', label: 'Dîner (Villebon)', icon: '🍽️' },
    { time: '19:30', label: 'Sermon 2 — p. Lee (19h30–21h)', icon: '📖' },
    { time: '21:00', label: 'Retour chambres, rangement, coucher', icon: '🌙' },
  ],
  // ── DIMANCHE 5 AVRIL ──
  [
    { time: '06:00', label: 'QT — Quiet Time', icon: '🙏' },
    { time: '07:00', label: 'Petit-déjeuner (Villebon)', icon: '☕' },
    { time: '10:00', label: 'Sermon 3 — p. Hermann (10h–12h)', icon: '📖' },
    { time: '12:00', label: 'Déjeuner (Villebon)', icon: '🍽️' },
    { time: '13:00', label: 'Sermon 4 — p. Lee (13h–14h45)', icon: '📖' },
    { time: '15:00', label: 'Sermon 5 — p. Hermann (15h–17h)', icon: '📖' },
    { time: '18:00', label: 'Dîner (Villebon)', icon: '🍽️' },
    { time: '18:00', label: 'Communion et entretiens (18h–20h)', icon: '🤝' },
    { time: '20:00', label: 'Retour chambres, rangement, coucher', icon: '🌙' },
  ],
  // ── LUNDI 6 AVRIL ──
  [
    { time: '06:00', label: 'QT — Quiet Time', icon: '🙏' },
    { time: '07:00', label: 'Petit-déjeuner (Villebon)', icon: '☕' },
    { time: '09:00', label: 'Sermon 6 — p. Oh · Sainte Cène (9h–11h30)', icon: '✝️' },
    { time: '11:30', label: 'Déjeuner de clôture (Villebon)', icon: '🍽️' },
    { time: '12:30', label: 'Fin de la retraite — Départ', icon: '👋' },
  ],
]

/* ── LANG SELECTOR ── */
function LangSelector({ lang, setLang, dark = true }: { lang: Lang; setLang: (l: Lang) => void; dark?: boolean }) {
  const [open, setOpen] = useState(false)
  const flags: Record<Lang, string> = { fr: '🇫🇷', en: '🇬🇧', ko: '🇰🇷', zh: '🇨🇳' }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
          dark
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'bg-primary-l hover:bg-sky-l text-primary'
        }`}
      >
        <span>{flags[lang]}</span>
        <span className="text-[10px]">▼</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-xl border border-line overflow-hidden z-50 min-w-[130px]">
          {(Object.keys(LANG_LABELS) as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-warm transition-colors ${
                l === lang ? 'bg-primary-l text-primary font-bold' : 'text-ink'
              }`}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function HomePage() {
  const [lang, setLang] = useState<Lang>('fr')
  const [screen, setScreen] = useState<Screen>('login')
  const [tab, setTab] = useState<Tab>('annonces')
  const [user, setUser] = useState<Participant | null>(null)
  const [selectedChurch, setSelectedChurch] = useState<string | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [modalAnn, setModalAnn] = useState<Announcement | null>(null)
  const [toast, setToast] = useState({ visible: false, title: '', body: '' })

  const T = (key: string) => tr(key, lang)

  const loadData = useCallback(async (church: string) => {
    try {
      const [anns, parts] = await Promise.all([
        ApiClient.getAnnouncements(church),
        ApiClient.getParticipants(),
      ])
      setAnnouncements(anns)
      setParticipants(parts)
    } catch (e) { console.error('Failed to load data', e) }
  }, [])

  async function handleLogin() {
    if (!nameInput.trim() || !selectedChurch) {
      setLoginError(T('login.errorMissing')); return
    }
    setLoading(true); setLoginError(null)
    try {
      const participant = await ApiClient.login(nameInput.trim(), selectedChurch)
      setUser(participant); setScreen('room')
    } catch { setLoginError(T('login.errorNotFound')) }
    finally { setLoading(false) }
  }

  function goApp() {
    if (!user) return
    setScreen('app'); loadData(user.church)
  }

  function openAnnouncement(ann: Announcement) {
    setModalAnn(ann); setReadIds(prev => new Set(prev).add(ann.id))
  }

  const unreadCount = announcements.filter(a => !readIds.has(a.id)).length

  // ══════════ LOGIN ══════════
  if (screen === 'login') {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0A1628] via-[#0F2545] to-[#153463] relative overflow-hidden">
        {/* Decorative globe watermark */}
        <div className="absolute top-[15%] right-[-5%] w-[200px] h-[200px] opacity-[0.04]">
          <Image src="/logo-lwm.jpeg" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-[10%] left-[-3%] w-[150px] h-[150px] opacity-[0.03] rotate-[-10deg]">
          <Image src="/logo-lwm.jpeg" alt="" fill className="object-contain" />
        </div>

        {/* Lang selector */}
        <div className="absolute top-4 right-4 z-10">
          <LangSelector lang={lang} setLang={setLang} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Logo + Header */}
          <div className="animate-drop text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 relative animate-pop">
              <Image
                src="/logo-lwm.jpeg"
                alt="LWM Logo"
                fill
                className="object-contain rounded-2xl shadow-[0_8px_32px_rgba(77,168,218,.3)]"
              />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[3px] text-sky-b mb-3">
              {T('login.subtitle')}
            </div>
            <h1 className="text-[28px] font-display font-bold text-white leading-snug">
              {T('login.welcome')}
            </h1>
            <p className="text-pale text-[13px] mt-2">
              {T('login.dates')}
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-[320px] animate-up" style={{ animationDelay: '200ms' }}>
            <input
              id="login-name"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              type="text"
              placeholder={T('login.namePlaceholder')}
              className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sky/60 focus:bg-white/15 transition-all"
            />

            <div className="flex gap-2 mt-3">
              {[
                { id: 'paris', icon: '⛪', labelKey: 'login.churchParis' },
                { id: 'bourget', icon: '🕊️', labelKey: 'login.churchBourget' },
                { id: 'invite', icon: '🌿', labelKey: 'login.churchInvite' },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChurch(c.id)}
                  className={`flex-1 rounded-xl py-3 text-center transition-all ${
                    selectedChurch === c.id
                      ? 'bg-sky/20 border-2 border-sky text-sky-b scale-[1.03]'
                      : 'bg-white/5 border-2 border-transparent text-white/50 hover:bg-white/10'
                  }`}
                >
                  <div className="text-lg mb-1">{c.icon}</div>
                  <div className="text-[10px] font-semibold leading-tight">{T(c.labelKey)}</div>
                </button>
              ))}
            </div>

            {loginError && (
              <div className="mt-3 bg-red/10 border border-red/20 rounded-xl p-3 animate-shake">
                <div className="text-[12px] text-red-b font-semibold">{loginError}</div>
              </div>
            )}

            <button
              id="login-submit"
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-sky text-white rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(27,94,138,.4)] hover:shadow-[0_6px_24px_rgba(27,94,138,.5)] transition-all disabled:opacity-50"
            >
              {loading ? T('login.loading') : T('login.submit')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ══════════ ROOM ══════════
  if (screen === 'room') {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0A1628] via-[#0F2545] to-[#153463] relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <LangSelector lang={lang} setLang={setLang} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="animate-drop">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <Image src="/logo-lwm.jpeg" alt="LWM" fill className="object-contain rounded-xl" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[3px] text-sky-b mb-2">
              {T('room.title')}
            </div>
            <div className="text-white text-lg font-semibold mb-6">{user?.name}</div>

            {user?.room ? (
              <>
                <div className="animate-pop text-[64px] font-extrabold text-sky-b leading-none mb-2 font-display">
                  {user.room}
                </div>
                <div className="text-pale text-[13px]">{T('room.location')}</div>
              </>
            ) : (
              <>
                <div className="animate-pop text-[48px] mb-2">🚫</div>
                <div className="text-red-b font-semibold text-lg mb-1">{T('room.noRoom')}</div>
                <div className="mt-4 bg-sky/10 border border-sky/20 rounded-xl p-4 flex items-start gap-3 max-w-[300px]">
                  <span className="text-xl mt-0.5">📞</span>
                  <span className="text-[13px] text-sky-b text-left leading-relaxed">
                    {T('room.noRoomContact')}
                  </span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={goApp}
            className="mt-10 py-3 px-8 bg-gradient-to-r from-primary to-sky text-white rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(27,94,138,.4)] transition-all animate-up"
            style={{ animationDelay: '400ms' }}
          >
            {T('room.goApp')}
          </button>
        </div>
      </div>
    )
  }

  // ══════════ ADMIN ══════════
  if (screen === 'admin' && user) {
    return <AdminPanel participants={participants} onBack={() => setScreen('app')} lang={lang} setLang={setLang} user={user} />
  }

  // ══════════ APP ══════════
  const tabs: { id: Tab; icon: string; labelKey: string }[] = [
    { id: 'annonces', icon: '📢', labelKey: 'tab.annonces' },
    { id: 'planning', icon: '📅', labelKey: 'tab.planning' },
    { id: 'plan', icon: '🗺️', labelKey: 'tab.plan' },
    { id: 'infos', icon: 'ℹ️', labelKey: 'tab.infos' },
  ]

  const isAdmin = user?.isAdmin || false

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-bg">
      <Toast visible={toast.visible} title={toast.title} body={toast.body} onClose={() => setToast(t => ({ ...t, visible: false }))} lang={lang} />
      <AnnouncementModal announcement={modalAnn} onClose={() => setModalAnn(null)} lang={lang} />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#0A1628] to-[#153463] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 relative shrink-0">
              <Image src="/logo-lwm.jpeg" alt="LWM" fill className="object-contain rounded-lg" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-sky-b">
                {T('app.title')}
              </div>
              <div className="text-white text-[14px] font-semibold mt-0.5">{user?.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <LangSelector lang={lang} setLang={setLang} />
            <div className="bg-white/10 text-[12px] text-sky-b px-2.5 py-1.5 rounded-lg font-bold">
              🏠 {user?.room || '—'}
            </div>
            {isAdmin && (
              <button
                onClick={() => { setScreen('admin'); loadData(user?.church || 'tous') }}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                title="Admin"
              >
                ⚙️
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-warm border-b border-line">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 text-center transition-all relative ${
              tab === t.id ? 'text-primary font-bold' : 'text-muted hover:text-ink'
            }`}
          >
            <div className="text-[15px]">{t.icon}</div>
            <div className="text-[10px] mt-0.5 flex items-center justify-center gap-1">
              {T(t.labelKey)}
              {t.id === 'annonces' && unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            {tab === t.id && (
              <div className="absolute bottom-0 left-[20%] right-[20%] h-[3px] bg-primary rounded-t-full animate-scale" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4">
        {tab === 'annonces' && (
          <div>
            <Countdown lang={lang} />
            <div className="mt-4">
              <AnnouncementList announcements={announcements} onOpen={openAnnouncement} readIds={readIds} lang={lang} />
            </div>
          </div>
        )}

        {tab === 'planning' && (
          <div className="flex flex-col gap-5">
            {PLANNING_ITEMS.map((items, di) => (
              <div key={di} className="animate-up" style={{ animationDelay: `${di * 100}ms` }}>
                <div className="text-[13px] font-bold text-primary uppercase tracking-wide mb-3">
                  {T(PLANNING_KEYS[di])}
                </div>
                <div className="flex flex-col gap-1.5">
                  {items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-line/60 hover:border-primary/20 transition-colors">
                      <div className="text-[18px]">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-ink">{item.label}</div>
                      </div>
                      <div className="text-[12px] font-bold text-primary bg-primary-l px-2 py-0.5 rounded-md">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'plan' && (
          <div className="animate-up">
            <div className="bg-white rounded-2xl border border-line p-4">
              <div className="text-[13px] font-bold text-ink mb-1">📍 {T('plan.location')}</div>
              <div className="text-primary font-bold text-lg mb-4">
                {user?.room ? `${T('room.room')} ${user.room}` : T('plan.roomConfirm')}
              </div>
              
              {user && (
                <FloorPlan participants={participants} currentUser={user} lang={lang} />
              )}

              <div className="mt-6 bg-warm rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto relative mb-2">
                  <Image src="/logo-lwm.jpeg" alt="LWM" fill className="object-contain" />
                </div>
                <div className="text-xs font-semibold text-ink">Centre des Pères Lazaristes</div>
                <div className="text-[10px] text-muted">Villebon-sur-Yvette</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[13px] font-bold text-ink mb-2">👥 {T('plan.allParticipants')} ({participants.length})</div>
              <div className="bg-white rounded-2xl border border-line overflow-hidden">
                <ParticipantList participants={participants} />
              </div>
            </div>
          </div>
        )}

        {tab === 'infos' && (
          <div className="flex flex-col gap-3 animate-up">
            {[
              { icon: '📋', titleKey: 'info.rules.title', bg: '#ECFDF5', bodyKey: 'info.rules.body' },
              { icon: '⚠️', titleKey: 'info.key.title', bg: '#FEF3C7', bodyKey: 'info.key.body' },
              { icon: '📍', titleKey: 'info.lieu.title', bg: '#FEF2F2', bodyKey: 'info.lieu.body' },
              { icon: '🗓️', titleKey: 'info.dates.title', bg: '#F5F3FF', bodyKey: 'info.dates.body' },
            ].map((info, i) => (
              <div key={i} className="bg-white rounded-2xl border border-line overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: info.bg }}>
                    {info.icon}
                  </div>
                  <div className="text-[14px] font-bold text-ink">{T(info.titleKey)}</div>
                </div>
                <div className="px-4 py-3 text-[13px] text-muted leading-relaxed whitespace-pre-line">{T(info.bodyKey)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════ ADMIN PANEL ══════════ */
function AdminPanel({ participants, onBack, lang, setLang, user }: {
  participants: Participant[]; onBack: () => void; lang: Lang; setLang: (l: Lang) => void; user: Participant
}) {
  const T = (key: string) => tr(key, lang)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [type, setType] = useState('info')
  const [audience, setAudience] = useState('tous')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const parisCount = participants.filter(p => p.church === 'paris').length
  const bourgetCount = participants.filter(p => p.church === 'bourget').length
  const inviteCount = participants.filter(p => p.church === 'invite').length
  const roomOk = participants.filter(p => p.room).length
  const pending = participants.filter(p => !p.room).length

  async function handleSend() {
    if (!title || !body) return alert('Renseignez le titre et le message.')
    setSending(true)
    try { 
      await ApiClient.createAnnouncement({ 
        titleFr: title, 
        bodyFr: body, 
        type, 
        audience, 
        authorId: user.id 
      }); 
      setSent(true) 
    }
    catch { alert('Erreur') }
    finally { setSending(false) }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-bg">
      <div className="bg-gradient-to-b from-[#0A1628] to-[#153463] px-5 pt-10 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 relative shrink-0">
              <Image src="/logo-lwm.jpeg" alt="LWM" fill className="object-contain rounded-lg" />
            </div>
            <div>
              <div className="text-white text-lg font-bold">{T('admin.title')}</div>
              <div className="text-pale text-[12px]">{T('admin.subtitle')}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LangSelector lang={lang} setLang={setLang} />
            <button onClick={onBack} className="text-sky-b text-sm font-semibold hover:text-sky transition-colors">
              {T('admin.back')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-4">
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { n: participants.length, lKey: 'admin.registered' },
            { n: roomOk, lKey: 'admin.roomsOk' },
            { n: pending, lKey: 'admin.pending' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-line p-3 text-center">
              <div className="text-2xl font-extrabold text-ink">{s.n}</div>
              <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mt-0.5">{T(s.lKey)}</div>
            </div>
          ))}
        </div>

        <div className="text-[13px] font-bold text-ink mb-2">{T('admin.publish')}</div>
        <div className="bg-white rounded-2xl border border-line p-4 mb-5">
          {!sent ? (
            <>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder={T('admin.titlePlaceholder')}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors mb-2" />
              <textarea value={body} onChange={e => setBody(e.target.value)} placeholder={T('admin.bodyPlaceholder')} rows={3}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none mb-3" />
              <div className="flex gap-2 mb-3">
                {[
                  { id: 'info', label: '📘 Info' },
                  { id: 'urgent', label: '🔴 Urgent' },
                  { id: 'pratique', label: '🌿 Pratique' },
                ].map(t => (
                  <button key={t.id} onClick={() => setType(t.id)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                      type === t.id
                        ? t.id === 'info' ? 'bg-blue-l text-blue border border-blue/20'
                        : t.id === 'urgent' ? 'bg-red-l text-red border border-red/20'
                        : 'bg-sage-l text-sage border border-sage/20'
                        : 'bg-warm text-muted border border-transparent'
                    }`}>{t.label}</button>
                ))}
              </div>
              <select value={audience} onChange={e => setAudience(e.target.value)}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm text-muted focus:outline-none focus:border-primary/50 mb-3">
                <option value="tous">{T('admin.allParticipants')} ({participants.length})</option>
                <option value="paris">⛪ {T('login.churchParis')} ({parisCount})</option>
                <option value="bourget">🕊️ {T('login.churchBourget')} ({bourgetCount})</option>
                <option value="invite">🌿 {T('login.churchInvite')} ({inviteCount})</option>
              </select>
              <button onClick={handleSend} disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-primary to-sky text-white rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(27,94,138,.4)] transition-all disabled:opacity-50">
                {sending ? T('admin.sending') : T('admin.send')}
              </button>
            </>
          ) : (
            <div className="text-center py-6 animate-pop">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-lg font-bold text-ink">{T('admin.sent')}</div>
              <div className="text-sm text-muted mt-1">{participants.length} {T('admin.notified')}</div>
              <button onClick={() => { setTitle(''); setBody(''); setSent(false) }}
                className="mt-4 px-6 py-2 bg-ink text-white rounded-xl text-sm font-semibold hover:bg-ink2 transition-colors">
                {T('admin.newAnn')}
              </button>
            </div>
          )}
        </div>

        <div className="text-[13px] font-bold text-ink mb-2">{T('admin.participants')} ({participants.length})</div>
        <div className="bg-white rounded-2xl border border-line overflow-hidden">
          <ParticipantList participants={participants} />
        </div>
      </div>
    </div>
  )
}
