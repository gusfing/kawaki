import { randomUUID } from 'crypto';
import { db } from '../../db/index.js';
import { analyticsEvents } from '../../db/schema.js';
import { eq, gte, lte, desc } from 'drizzle-orm';

export class AnalyticsService {
  async trackEvent(data: {
    type: string;
    page?: string;
    userId?: string;
    metadata?: Record<string, unknown>;
  }) {
    const event = {
      id: randomUUID(),
      type: data.type,
      page: data.page || null,
      userId: data.userId || null,
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      createdAt: new Date(),
    };

    db.insert(analyticsEvents).values(event).run();

    return {
      id: event.id,
      type: event.type,
      page: event.page,
      createdAt: event.createdAt,
    };
  }

  async getSummary(period: '7d' | '30d' | '90d' = '30d') {
    const now = new Date();
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const allEvents = db
      .select()
      .from(analyticsEvents)
      .where(gte(analyticsEvents.createdAt, startDate))
      .all();

    const totalViews = allEvents.filter((e) => e.type === 'page_view').length;

    const uniqueVisitors = new Set(
      allEvents.map((e) => e.userId).filter(Boolean)
    ).size;

    const pageViews: Record<string, number> = {};
    allEvents
      .filter((e) => e.type === 'page_view' && e.page)
      .forEach((e) => {
        pageViews[e.page!] = (pageViews[e.page!] || 0) + 1;
      });

    const topPages = Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const trends = this.generateTrends(allEvents, days);

    return {
      totalViews,
      uniqueVisitors,
      topPages,
      trends,
      period,
    };
  }

  private generateTrends(
    events: any[],
    days: number
  ): { date: string; views: number }[] {
    const trends: Record<string, number> = {};

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      trends[dateStr] = 0;
    }

    events.forEach((e) => {
      const dateStr = new Date(e.createdAt).toISOString().split('T')[0];
      if (dateStr in trends) {
        trends[dateStr]++;
      }
    });

    return Object.entries(trends)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getPageStats(page: string) {
    const events = db
      .select()
      .from(analyticsEvents)
      .where(eq(analyticsEvents.page, page))
      .all();

    const pageViews = events.filter((e) => e.type === 'page_view').length;
    const clicks = events.filter((e) => e.type === 'click').length;
    const submissions = events.filter((e) => e.type === 'submit').length;
    const uniqueVisitors = new Set(events.map((e) => e.userId).filter(Boolean))
      .size;

    return {
      page,
      pageViews,
      uniqueVisitors,
      clicks,
      submissions,
      bounceRate: this.calculateBounceRate(events),
      timeOnPage: this.calculateTimeOnPage(events),
    };
  }

  private calculateBounceRate(events: any[]): number {
    if (events.length === 0) return 0;

    const sessions: Record<string, any[]> = {};
    events.forEach((e) => {
      if (!sessions[e.userId]) sessions[e.userId] = [];
      sessions[e.userId].push(e);
    });

    const bounces = Object.values(sessions).filter((s) => s.length === 1).length;
    return Math.round((bounces / Object.keys(sessions).length) * 100);
  }

  private calculateTimeOnPage(events: any[]): number {
    if (events.length < 2) return 0;

    const sorted = events.sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    let totalTime = 0;
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = new Date(sorted[i].createdAt).getTime();
      const next = new Date(sorted[i + 1].createdAt).getTime();
      totalTime += next - current;
    }

    const avgMs = totalTime / Math.max(sorted.length - 1, 1);
    return Math.round(avgMs / 1000);
  }
}

export const analyticsService = new AnalyticsService();
