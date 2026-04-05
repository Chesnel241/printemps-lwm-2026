import { NextResponse } from 'next/server';
import { PhotosService } from '@/backend/services/photos.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const photos = await PhotosService.getPhotos();
    return NextResponse.json(photos);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { url, author, caption } = await req.json();
    if (!url || !author) throw new Error('URL and author are required');
    const photo = await PhotosService.addPhoto(url, author, caption);
    return NextResponse.json({ ok: true, photo });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
