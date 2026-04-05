import { prisma } from '../db/prisma.server';

export class PhotosService {
  static async getPhotos() {
    return prisma.photo.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async addPhoto(url: string, author: string, caption?: string) {
    return prisma.photo.create({
      data: {
        url,
        author,
        caption
      }
    });
  }
}
