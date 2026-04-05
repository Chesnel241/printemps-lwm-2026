import { NextResponse } from 'next/server'
import { AuthService } from '@/backend/services/auth.service'

export async function POST(req: Request) {
  try {
    const { name, church } = await req.json()
    const participant = await AuthService.login(name, church)
    return NextResponse.json({ ok: true, participant })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 404 })
  }
}
