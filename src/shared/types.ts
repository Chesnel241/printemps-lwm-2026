export type Participant = {
  id: string
  num: number
  name: string
  church: string
  room: string | null
  isAdmin: boolean
  createdAt: string | Date
}

export type Announcement = {
  id: string
  titleFr: string
  titleEn?: string
  titleKo?: string
  titleZh?: string
  bodyFr: string
  bodyEn?: string
  bodyKo?: string
  bodyZh?: string
  type: string
  audience: string
  createdAt: string | Date
}
