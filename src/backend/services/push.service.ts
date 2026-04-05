import webpush from 'web-push';
import { prisma } from '../db/prisma.server';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BP7UAtAO6MOhJNdh0FcM7c61HxhxdDb8kLkTTukp_4adzx5yjlHbhPLs2FJvTSat8fwbY7sJSEHvUGr2AwwaoM0';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'FYHsriJRCJEH5hPmh3lspkaTWJm79rsw3sln1CYuELI';

webpush.setVapidDetails(
  'mailto:missionparolevie@gmail.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export class PushService {
  static async subscribe(subscription: any, userId?: string) {
    return prisma.pushSubscription.upsert({
      where: { endpoint: subscription.endpoint },
      update: { userId },
      create: {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        userId: userId
      }
    });
  }

  static async sendNotification(title: string, body: string, url: string = '/') {
    const subscriptions = await prisma.pushSubscription.findMany();
    
    const notifications = subscriptions.map((sub) => {
      const pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.auth,
          p256dh: sub.p256dh
        }
      };

      return webpush.sendNotification(
        pushConfig,
        JSON.stringify({ title, body, url })
      ).catch(async (err) => {
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Subscription expired/gone
          console.log('Subscription expired/gone, removing:', sub.endpoint);
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        } else {
          console.error('Push error:', err);
        }
      });
    });

    await Promise.all(notifications);
  }
}
