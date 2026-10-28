import { AutoBuzzSocialPost, SocialChannel } from '../types/autobuzz';

export interface PublishResult {
  success: boolean;
  publishedUrl?: string;
  isManualFallback: boolean;
  instructions?: string;
  error?: string;
}

export class SocialPublisher {
  private static publishedKeys = new Set<string>();

  public static async publishPost(
    post: AutoBuzzSocialPost,
    connectedAccountId?: string | null
  ): Promise<PublishResult> {
    // 1. Idempotency Guard: prevent duplicate dispatch
    if (this.publishedKeys.has(post.idempotencyKey) || post.publishingStatus === 'published') {
      return {
        success: true,
        publishedUrl: post.publishedUrl || 'https://autobuzz.app/posts/already-published',
        isManualFallback: false,
        instructions: `Idempotency guard active: Post [${post.id}] was already processed. Disallow duplicate dispatch.`,
      };
    }

    // 2. Check Official Connection
    if (!connectedAccountId) {
      return {
        success: true,
        isManualFallback: true,
        instructions: this.getManualFallbackInstructions(post),
      };
    }

    // 3. Mark processed
    this.publishedKeys.add(post.idempotencyKey);
    const publishedUrl = this.simulateOfficialPublishUrl(post.channel, post.id);

    return {
      success: true,
      publishedUrl,
      isManualFallback: false,
    };
  }

  private static getManualFallbackInstructions(post: AutoBuzzSocialPost): string {
    const channelName = post.channel.toUpperCase().replace('_', ' ');
    return `[AutoBuzz Manual Publishing Guide for ${channelName}]
1. Official API integration for ${channelName} is not yet connected.
2. English Copy:
"${post.content}"
3. Bangla Copy:
"${post.contentBn}"
4. Media Reference: ${post.mediaUrl || 'None specified'}
5. Copy text to your official ${channelName} publisher and mark as Published manually.`;
  }

  private static simulateOfficialPublishUrl(channel: SocialChannel, postId: string): string {
    switch (channel) {
      case 'youtube_shorts':
        return `https://youtube.com/shorts/abz_${postId.substring(0, 8)}`;
      case 'facebook':
        return `https://facebook.com/autobuzz/posts/${postId.substring(0, 8)}`;
      case 'instagram':
        return `https://instagram.com/p/abz_${postId.substring(0, 8)}`;
      case 'tiktok':
        return `https://tiktok.com/@autobuzz/video/${postId.substring(0, 8)}`;
      default:
        return `https://autobuzz.app/published/${postId.substring(0, 8)}`;
    }
  }
}
