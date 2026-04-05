import { NextResponse } from 'next/server';
import { PushService } from '@/backend/services/push.service';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { subscription, userId } = await req.json();
    await PushService.subscribe(subscription, userId);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
