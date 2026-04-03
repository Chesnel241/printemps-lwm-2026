import { prisma } from '../db/prisma.server'

export class AnnouncementsService {
  static async getAnnouncements(church: string) {
    return prisma.announcement.findMany({
      where: {
        OR: [
          { audience: 'tous' },
          { audience: church }
        ]
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  private static async autoTranslate(text: string, to: string): Promise<string> {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|${to}`);
      const data = await res.json();
      if (data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
      return `[${to.toUpperCase()}] ${text}`; // Fallback if API fails
    } catch (e) {
      console.error('Translation error:', e);
      return `[${to.toUpperCase()}] ${text}`;
    }
  }

  static async createAnnouncement(data: { 
    titleFr: string, 
    bodyFr: string, 
    type: string, 
    audience: string,
    authorId: string 
  }) {
    if (!data.titleFr || !data.bodyFr) throw new Error('Missing title or body')

    // Verify Admin status
    const author = await prisma.participant.findUnique({ where: { id: data.authorId } });
    if (!author || !author.isAdmin) {
      throw new Error('Unauthorized: Only administrators can post announcements');
    }

    // Parallel Translation
    const [titleEn, titleKo, titleZh, bodyEn, bodyKo, bodyZh] = await Promise.all([
      this.autoTranslate(data.titleFr, 'en'),
      this.autoTranslate(data.titleFr, 'ko'),
      this.autoTranslate(data.titleFr, 'zh'),
      this.autoTranslate(data.bodyFr, 'en'),
      this.autoTranslate(data.bodyFr, 'ko'),
      this.autoTranslate(data.bodyFr, 'zh')
    ]);

    return prisma.announcement.create({
      data: {
        titleFr: data.titleFr,
        titleEn,
        titleKo,
        titleZh,
        bodyFr: data.bodyFr,
        bodyEn,
        bodyKo,
        bodyZh,
        type: data.type || 'info',
        audience: data.audience || 'tous'
      }
    })
  }
}
