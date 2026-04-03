import { NextResponse } from 'next/server'
import { AuthService } from '@/backend/services/auth.service'

export async function GET() {
  const parts = await AuthService.getParticipants()
  return NextResponse.json(parts)
}
