import {
  MarketingSignal,
  CampaignStory,
  NarrativeArc,
  VideoScenePlan,
  SocialChannel,
  MarketingObjective,
} from '../types/autobuzz';

export class SignalToStoryEngine {
  /**
   * Transforms a raw business observation (Signal) into a structured Campaign Story.
   */
  public static transformSignalToStory(
    signal: MarketingSignal,
    options?: {
      targetAudience?: string;
      objective?: MarketingObjective;
      primaryChannel?: SocialChannel;
      targetUrl?: string;
    }
  ): CampaignStory {
    const objective = options?.objective || this.inferObjective(signal);
    const primaryChannel = options?.primaryChannel || this.inferPrimaryChannel(signal);
    const targetAudience = options?.targetAudience || this.inferTargetAudience(signal);
    const targetUrl = options?.targetUrl || 'https://istihadahmed007.github.io/AutoBuzz/';

    const narrative = this.synthesizeNarrative(signal, objective);
    const videoStoryboard = this.generateVideoStoryboard(signal, narrative);
    const hashtags = this.generateHashtags(signal, primaryChannel);
    const utmCampaign = this.slugify(signal.title);

    return {
      id: `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      workspaceId: signal.workspaceId,
      signalId: signal.id,
      title: `${signal.title} — Campaign Story`,
      targetAudience,
      objective,
      primaryChannel,
      supportedChannels: ['facebook', 'instagram', 'youtube_shorts', 'email'],
      narrative,
      videoStoryboard,
      hashtags,
      utmCampaign,
      utmSource: primaryChannel,
      utmMedium: 'social_automation',
      targetUrl,
      approvalStatus: 'draft',
      createdAt: new Date().toISOString(),
    };
  }

  private static inferObjective(signal: MarketingSignal): MarketingObjective {
    switch (signal.category) {
      case 'product_launch':
        return 'direct_sales';
      case 'customer_question':
        return 'audience_education';
      case 'search_opportunity':
        return 'brand_awareness';
      case 'lead_inquiry':
        return 'lead_generation';
      case 'performance_change':
        return 'customer_retention';
      default:
        return 'brand_awareness';
    }
  }

  private static inferPrimaryChannel(signal: MarketingSignal): SocialChannel {
    switch (signal.category) {
      case 'customer_question':
        return 'youtube_shorts';
      case 'product_launch':
        return 'facebook';
      case 'search_opportunity':
        return 'blog';
      case 'lead_inquiry':
        return 'email';
      default:
        return 'instagram';
    }
  }

  private static inferTargetAudience(signal: MarketingSignal): string {
    switch (signal.category) {
      case 'customer_question':
        return 'Curious customers seeking transparent answers to common hurdles';
      case 'product_launch':
        return 'Early adopters, high-intent buyers, and growing business founders';
      case 'search_opportunity':
        return 'Active searchers looking for practical guides and direct solutions';
      case 'lead_inquiry':
        return 'Qualified decision-makers evaluating automation solutions';
      default:
        return 'Modern digital entrepreneurs and marketing managers';
    }
  }

  /**
   * Synthesizes bilingual narrative arc (English + Bangla).
   */
  public static synthesizeNarrative(
    signal: MarketingSignal,
    objective: MarketingObjective
  ): NarrativeArc {
    const title = signal.title;
    const desc = signal.description;

    return {
      hook: `Stop guessing how to solve this: ${title}`,
      hookBn: `এই সমস্যার সমাধান নিয়ে বিভ্রান্তি দূর করুন: ${title}`,

      coreProposition: `Here is the real breakthrough: ${desc}. Instead of complicated guesswork, AutoBuzz transforms every signal into verified progress.`,
      corePropositionBn: `আসল সমাধান এখানে: ${desc}। জটিল অনুমানের পরিবর্তে অটোবাজ প্রতিটি সুযোগকে কার্যকর ফলাফলে রূপান্তর করে।`,

      credibilityProof: `Built on verified signals with zero fabricated metrics. Every step connects directly to real customer intent.`,
      credibilityProofBn: `সত্যিকারের ব্যবসায়িক তথ্যের ওপর ভিত্তি করে তৈরি — কোনো কৃত্রিম হিসাব নেই। প্রতিটি পদক্ষেপ গ্রাহকের প্রয়োজনীয়তার সাথে সরাসরি যুক্ত।`,

      callToAction: `Explore the live solution and take action today at AutoBuzz.`,
      callToActionBn: `আজই অটোবাজে যুক্ত হয়ে সরাসরি সমাধানটি ব্যবহার শুরু করুন।`,
    };
  }

  /**
   * Generates a 4-scene vertical video storyboard (9:16) for Shorts / TikTok.
   */
  public static generateVideoStoryboard(
    signal: MarketingSignal,
    narrative: NarrativeArc
  ): VideoScenePlan[] {
    return [
      {
        sceneNumber: 1,
        timeRange: '0:00 - 0:04',
        visualShot: 'High-contrast close-up of pain-point with animated warning badge on mobile screen',
        audioVoiceover: narrative.hook,
        audioVoiceoverBn: narrative.hookBn,
        onScreenText: 'Watch This First ⚡',
      },
      {
        sceneNumber: 2,
        timeRange: '0:04 - 0:15',
        visualShot: 'Fast-paced demonstration of the signal context with step-by-step UI screencast',
        audioVoiceover: narrative.coreProposition,
        audioVoiceoverBn: narrative.corePropositionBn,
        onScreenText: 'The Clear Solution 🎯',
      },
      {
        sceneNumber: 3,
        timeRange: '0:15 - 0:24',
        visualShot: 'Side-by-side comparison illustrating time saved and verified results',
        audioVoiceover: narrative.credibilityProof,
        audioVoiceoverBn: narrative.credibilityProofBn,
        onScreenText: 'Real Data · Zero Guesswork',
      },
      {
        sceneNumber: 4,
        timeRange: '0:24 - 0:30',
        visualShot: 'AutoBuzz logo reveal with prominent tap-to-open gesture pointing down',
        audioVoiceover: narrative.callToAction,
        audioVoiceoverBn: narrative.callToActionBn,
        onScreenText: 'Tap Link in Bio 🚀',
      },
    ];
  }

  private static generateHashtags(signal: MarketingSignal, channel: SocialChannel): string[] {
    const base = ['#AutoBuzz', '#MarketingAutomation', '#GrowthEngine'];
    if (signal.category === 'product_launch') base.push('#ProductLaunch', '#Innovation');
    if (signal.category === 'customer_question') base.push('#CustomerSuccess', '#FAQ', '#BusinessTips');
    if (signal.category === 'search_opportunity') base.push('#SEO', '#OrganicGrowth');
    if (channel === 'youtube_shorts') base.push('#Shorts', '#ShortsFeed');
    if (channel === 'tiktok') base.push('#TikTokGrowth', '#ViralTips');
    return base;
  }

  public static buildUtmLink(baseUrl: string, source: string, medium: string, campaign: string): string {
    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', source);
    url.searchParams.set('utm_medium', medium);
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('utm_content', 'signal_to_story');
    return url.toString();
  }

  private static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 40);
  }
}
