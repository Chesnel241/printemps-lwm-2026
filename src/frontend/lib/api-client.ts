import { Participant, Announcement } from '@/shared/types'

export class ApiClient {
  static async login(name: string, church: string): Promise<Participant> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, church })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data.participant
  }

  static async getAnnouncements(church: string): Promise<Announcement[]> {
    const res = await fetch(`/api/announcements?church=${encodeURIComponent(church)}`)
    return res.json()
  }

  static async createAnnouncement(data: { title: string, body: string, type: string, audience: string }) {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const d = await res.json()
    if (!res.ok) throw new Error(d.error)
    return d.announcement
  }

  static async getParticipants(): Promise<Participant[]> {
    const res = await fetch('/api/participants')
    return res.json()
  }
}
