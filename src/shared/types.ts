export type Participant = {
  id: string
  num: number
  name: string
  church: string
  room: string | null
  createdAt: Date
}

export type Announcement = {
  id: string
  title: string
  body: string
  type: string
  audience: string
  createdAt: Date
}
