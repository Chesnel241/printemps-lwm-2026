import { NextResponse } from 'next/server'
import { AuthService } from '@/backend/services/auth.service'

export const dynamic = 'force-dynamic'

export async function GET() {
  const parts = await AuthService.getParticipants()
  return NextResponse.json(parts)
}
