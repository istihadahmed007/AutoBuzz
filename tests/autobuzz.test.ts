import { describe, it, expect } from 'vitest';
import { SignalToStoryEngine } from '../src/services/signal-engine';
import { AutomationRunner, INITIAL_AUTOBUZZ_WORKFLOWS } from '../src/services/automation-runner';
import { SocialPublisher } from '../src/services/social-publisher';
import { SeoIntelService } from '../src/services/seo-intel';
import { MarketingSignal, AutoBuzzSocialPost } from '../src/types/autobuzz';

describe('AutoBuzz — Signal-to-Story Marketing Operating System', () => {
  const sampleSignal: MarketingSignal = {
    id: 'sig-launch-101',
    workspaceId: 'ws-autobuzz-hq',
    title: 'AI Signal Ingestion Feature Released',
    description: 'Teams can now convert website updates and customer feedback directly into multi-channel campaigns.',
    category: 'product_launch',
    priority: 'high',
    status: 'new',
    source: 'manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('1. Signal-to-Story Engine', () => {
    it('transforms raw signal into structured marketing campaign story', () => {
      const story = SignalToStoryEngine.transformSignalToStory(sampleSignal, {
        targetUrl: 'https://istihadahmed007.github.io/AutoBuzz/',
      });

      expect(story.id).toBeDefined();
      expect(story.signalId).toBe(sampleSignal.id);
      expect(story.title).toContain('AI Signal Ingestion');
      expect(story.objective).toBe('direct_sales');
      expect(story.primaryChannel).toBe('facebook');
      expect(story.approvalStatus).toBe('draft');
      expect(story.utmCampaign).toBe('ai-signal-ingestion-feature-released');
    });

    it('synthesizes bilingual narrative in English and Bangla with hooks and CTAs', () => {
      const narrative = SignalToStoryEngine.synthesizeNarrative(sampleSignal, 'direct_sales');

      expect(narrative.hook).toContain('Stop guessing');
      expect(narrative.hookBn).toContain('বিভ্রান্তি');
      expect(narrative.coreProposition).toContain('AutoBuzz');
      expect(narrative.corePropositionBn).toContain('অটোবাজ');
      expect(narrative.credibilityProof).toContain('zero fabricated metrics');
      expect(narrative.callToAction).toBeTruthy();
      expect(narrative.callToActionBn).toBeTruthy();
    });

    it('generates a 4-scene vertical video storyboard (9:16) for Shorts & TikTok', () => {
      const narrative = SignalToStoryEngine.synthesizeNarrative(sampleSignal, 'direct_sales');
      const storyboard = SignalToStoryEngine.generateVideoStoryboard(sampleSignal, narrative);

      expect(storyboard.length).toBe(4);
      expect(storyboard[0].timeRange).toBe('0:00 - 0:04');
      expect(storyboard[0].visualShot).toBeTruthy();
      expect(storyboard[0].audioVoiceover).toBe(narrative.hook);
      expect(storyboard[0].audioVoiceoverBn).toBe(narrative.hookBn);
      expect(storyboard[3].onScreenText).toContain('Bio');
    });

    it('builds trackable UTM links adhering to attribution standards', () => {
      const url = SignalToStoryEngine.buildUtmLink(
        'https://istihadahmed007.github.io/AutoBuzz/',
        'facebook',
        'social_automation',
        'summer-launch'
      );

      expect(url).toContain('utm_source=facebook');
      expect(url).toContain('utm_medium=social_automation');
      expect(url).toContain('utm_campaign=summer-launch');
      expect(url).toContain('utm_content=signal_to_story');
    });
  });

  describe('2. Automation Workflow Engine (Workflows A–F)', () => {
    it('pre-configures all 6 primary workflows with valid node graphs', () => {
      expect(INITIAL_AUTOBUZZ_WORKFLOWS.length).toBe(6);

      for (const wf of INITIAL_AUTOBUZZ_WORKFLOWS) {
        const validation = AutomationRunner.validateGraph(wf.nodes, wf.edges);
        expect(validation.isValid).toBe(true);
        expect(wf.nodes.length).toBeGreaterThanOrEqual(4);
        expect(wf.edges.length).toBeGreaterThanOrEqual(3);
      }
    });

    it('executes simulated workflow test runs and returns diagnostic execution trace', async () => {
      const wfA = INITIAL_AUTOBUZZ_WORKFLOWS[0];
      const result = await AutomationRunner.executeTestRun(wfA, { signalId: sampleSignal.id });

      expect(result.success).toBe(true);
      expect(result.logs.length).toBe(wfA.nodes.length);
      expect(result.logs[0].status).toBe('success');
    });
  });

  describe('3. Social Media Publishing & Idempotency Safeguards', () => {
    const post: AutoBuzzSocialPost = {
      id: 'post-test-999',
      workspaceId: 'ws-autobuzz-hq',
      channel: 'youtube_shorts',
      content: 'Here is how to automate marketing from real business signals.',
      contentBn: 'আসল ব্যবসায়িক সিগন্যাল থেকে মার্কেটিং স্বয়ংক্রিয় করার উপায়।',
      publishingStatus: 'draft',
      approvalStatus: 'approved',
      retryCount: 0,
      idempotencyKey: 'idemp-post-test-999',
      createdAt: new Date().toISOString(),
    };

    it('provides honest manual publishing fallback instructions when disconnected', async () => {
      const res = await SocialPublisher.publishPost(post, null);

      expect(res.success).toBe(true);
      expect(res.isManualFallback).toBe(true);
      expect(res.instructions).toContain('AutoBuzz Manual Publishing Guide for YOUTUBE SHORTS');
      expect(res.instructions).toContain(post.content);
      expect(res.instructions).toContain(post.contentBn);
    });

    it('protects against duplicate publishing via idempotency guard', async () => {
      // First publish with account
      const firstRes = await SocialPublisher.publishPost(post, 'acc-yt-connected');
      expect(firstRes.success).toBe(true);
      expect(firstRes.publishedUrl).toContain('youtube.com/shorts');

      // Second publish with same post
      const secondRes = await SocialPublisher.publishPost(post, 'acc-yt-connected');
      expect(secondRes.success).toBe(true);
      expect(secondRes.instructions).toContain('Idempotency guard active');
    });
  });

  describe('4. SEO Intelligence & Review Requirements', () => {
    it('generates on-page recommendations with mandatory human review guard', () => {
      const recs = SeoIntelService.generatePageRecommendations(
        'https://istihadahmed007.github.io/AutoBuzz/',
        'Marketing Automation'
      );

      expect(recs.length).toBe(3);
      expect(recs.every((r) => r.requiresReview === true)).toBe(true);
      expect(recs.some((r) => r.issue.includes('Title Tag'))).toBe(true);
      expect(recs.some((r) => r.issue.includes('Meta Description'))).toBe(true);
    });
  });
});
