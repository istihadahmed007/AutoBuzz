export interface SeoRecommendation {
  id: string;
  pageUrl: string;
  issue: string;
  currentValue: string;
  recommendedValue: string;
  rationale: string;
  requiresReview: boolean;
  status: 'pending_review' | 'approved' | 'applied';
}

export class SeoIntelService {
  public static generatePageRecommendations(pageUrl: string, topic: string): SeoRecommendation[] {
    const slug = pageUrl.replace(/^https?:\/\/[^/]+/, '') || '/';
    return [
      {
        id: `rec-title-${Date.now()}`,
        pageUrl,
        issue: 'Title Tag Can Be Optimized for Higher CTR',
        currentValue: `${topic} - Home`,
        recommendedValue: `${topic} | Automated Marketing & Real Results — AutoBuzz`,
        rationale: 'Incorporates intent-rich keywords and the brand promise while staying within 58 characters.',
        requiresReview: true,
        status: 'pending_review',
      },
      {
        id: `rec-meta-${Date.now()}`,
        pageUrl,
        issue: 'Meta Description Missing Clear Call-to-Action',
        currentValue: `A website about ${topic}.`,
        recommendedValue: `Discover how AutoBuzz transforms business signals into marketing campaigns. Build stories, automate workflows, and track real results.`,
        rationale: 'Stays within 155 characters and includes a strong verb-led CTA.',
        requiresReview: true,
        status: 'pending_review',
      },
      {
        id: `rec-alt-${Date.now()}`,
        pageUrl,
        issue: 'Missing Alt Text on Primary Hero Graphic',
        currentValue: '<img src="/hero.png">',
        recommendedValue: `alt="AutoBuzz Signal to Story Marketing Operating System Dashboard"`,
        rationale: 'Improves accessibility and visual search ranking for primary product screenshots.',
        requiresReview: true,
        status: 'pending_review',
      },
    ];
  }

  public static buildUtmUrl(baseUrl: string, campaign: string, channel: string): string {
    const cleanUrl = baseUrl.split('?')[0];
    return `${cleanUrl}?utm_source=${encodeURIComponent(channel)}&utm_medium=social_automation&utm_campaign=${encodeURIComponent(campaign)}&utm_content=autobuzz_signal`;
  }
}
