import { NextResponse } from 'next/server'
import { AnnouncementsService } from '@/backend/services/announcements.service'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const church = searchParams.get('church') || 'tous'
  const announcements = await AnnouncementsService.getAnnouncements(church)
  return NextResponse.json(announcements)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const announcement = await AnnouncementsService.createAnnouncement(data)
    return NextResponse.json({ ok: true, announcement })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 })
  }
}
