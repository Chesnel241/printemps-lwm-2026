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

  static async createAnnouncement(data: { title: string, body: string, type: string, audience: string }) {
    if (!data.title || !data.body) throw new Error('Missing title or body')
    return prisma.announcement.create({
      data: {
        title: data.title,
        body: data.body,
        type: data.type || 'info',
        audience: data.audience || 'tous'
      }
    })
  }
}
