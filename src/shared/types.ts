export type Participant = {
  id: string
  num: number
  name: string
  church: string
  room: string | null
  createdAt: Date
  isAdmin?: boolean
}

export interface Announcement {
  id: string
  titleFr: string
  titleEn?: string | null
  titleKo?: string | null
  titleZh?: string | null
  bodyFr: string
  bodyEn?: string | null
  bodyKo?: string | null
  bodyZh?: string | null
  type: string
  audience: string
}
