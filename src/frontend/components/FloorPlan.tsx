import React from 'react'
import { Participant } from '@/shared/types'
import { Lang, tr } from '@/frontend/lib/i18n'

interface FloorPlanProps {
  participants: Participant[]
  currentUser: Participant
  lang: Lang
}

export default function FloorPlan({ participants, currentUser, lang }: FloorPlanProps) {
  const T = (key: string) => tr(key, lang)

  // Extract all rooms from participants
  const roomMap = new Map<string, Participant[]>()
  participants.forEach(p => {
    if (p.room) {
      const list = roomMap.get(p.room) || []
      list.push(p)
      roomMap.set(p.room, list)
    }
  })

  // Define floors
  const floors = [
    { id: '3', label: T('plan.floor3'), rooms: ['300', '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312'] },
    { id: '2', label: T('plan.floor2'), rooms: ['200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '2'] },
    { id: '1', label: T('plan.floor1'), rooms: ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '109b', '111'] },
    { id: '0', label: T('plan.floor0'), rooms: ['L001', 'L002', 'L003', 'L004', 'L005'] },
  ]

  return (
    <div className="flex flex-col gap-6 p-1">
      {floors.map(floor => (
        <div key={floor.id} className="animate-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-line/50"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-muted">{floor.label}</h3>
            <div className="h-px flex-1 bg-line/50"></div>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {floor.rooms.map(roomNum => {
              const occupants = roomMap.get(roomNum) || []
              const isUserRoom = currentUser.room === roomNum
              const hasOccupants = occupants.length > 0

              return (
                <div
                  key={roomNum}
                  className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center p-1 transition-all ${
                    isUserRoom 
                      ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(27,94,138,0.5)] z-10 scale-105 animate-pulse-subtle'
                      : hasOccupants
                        ? 'bg-white border-line hover:border-primary/30'
                        : 'bg-warm/30 border-line/50 opacity-40'
                  }`}
                >
                  <span className={`text-[11px] font-bold ${isUserRoom ? 'text-white' : 'text-ink opacity-60'}`}>
                    {roomNum}
                  </span>
                  
                  {hasOccupants && (
                    <div className="mt-1 flex flex-wrap justify-center gap-0.5">
                      {occupants.slice(0, 3).map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${isUserRoom ? 'bg-white/50' : 'bg-primary/40'}`} />
                      ))}
                      {occupants.length > 3 && <span className="text-[8px] opacity-50">+</span>}
                    </div>
                  )}

                  {/* Tooltip or Admin view overlay */}
                  {currentUser.isAdmin && hasOccupants && (
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-white/95 rounded-xl z-20 flex flex-col p-1.5 justify-center overflow-hidden border border-primary/20 shadow-xl">
                      <div className="text-[8px] font-bold text-primary mb-0.5 border-b border-primary/10">{roomNum}</div>
                      {occupants.map(o => (
                        <div key={o.id} className="text-[7px] leading-tight text-ink truncate font-medium">
                          • {o.name.split(' ')[0]}
                        </div>
                      ))}
                    </div>
                  )}

                  {isUserRoom && (
                    <div className="absolute -top-1 -right-1 bg-sky text-[8px] px-1 rounded-md font-bold shadow-sm">
                      YOU
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
