/**
 * AutoBuzz — Signal-to-Story Marketing Operating System
 * Core Data Contracts and Type System
 * Create. Automate. Grow.
 */

export type SignalCategory =
  | 'product_launch'
  | 'website_update'
  | 'customer_question'
  | 'search_opportunity'
  | 'seasonal_event'
  | 'lead_inquiry'
  | 'performance_change'
  | 'announcement';

export type SignalPriority = 'urgent' | 'high' | 'medium' | 'low';

export type SignalStatus = 'new' | 'in_progress' | 'converted' | 'dismissed';

export type SignalSource = 'manual' | 'website_webhook' | 'search_console' | 'crm_inbound' | 'analytics_alert';

export interface MarketingSignal {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  category: SignalCategory;
  priority: SignalPriority;
  status: SignalStatus;
  source: SignalSource;
  sourceUrl?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type MarketingObjective =
  | 'brand_awareness'
  | 'lead_generation'
  | 'direct_sales'
  | 'audience_education'
  | 'customer_retention';

export type SocialChannel =
  | 'facebook'
  | 'instagram'
  | 'youtube_shorts'
  | 'tiktok'
  | 'email'
  | 'blog';

export interface NarrativeArc {
  hook: string;
  hookBn: string;
  coreProposition: string;
  corePropositionBn: string;
  credibilityProof: string;
  credibilityProofBn: string;
  callToAction: string;
  callToActionBn: string;
}

export interface VideoScenePlan {
  sceneNumber: number;
  timeRange: string;
  visualShot: string;
  audioVoiceover: string;
  audioVoiceoverBn: string;
  onScreenText: string;
}

export interface CampaignStory {
  id: string;
  workspaceId: string;
  signalId?: string;
  title: string;
  targetAudience: string;
  objective: MarketingObjective;
  primaryChannel: SocialChannel;
  supportedChannels: SocialChannel[];
  narrative: NarrativeArc;
  videoStoryboard?: VideoScenePlan[];
  hashtags: string[];
  utmCampaign: string;
  utmSource: string;
  utmMedium: string;
  targetUrl: string;
  approvalStatus: 'draft' | 'in_review' | 'approved' | 'rejected';
  createdAt: string;
}

export interface CampaignExperiment {
  id: string;
  workspaceId: string;
  storyId?: string;
  name: string;
  hypothesis: string;
  channel: SocialChannel;
  variantA: string;
  variantB: string;
  primaryMetric: string;
  targetConversionRate: number;
  actualConversionRate?: number;
  status: 'planning' | 'running' | 'concluded' | 'inconclusive';
  createdAt: string;
}

export type PostPublishingStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface AutoBuzzSocialPost {
  id: string;
  workspaceId: string;
  storyId?: string;
  channel: SocialChannel;
  content: string;
  contentBn: string;
  mediaUrl?: string;
  scheduledAt?: string;
  approvalStatus: 'draft' | 'approved' | 'rejected';
  publishingStatus: PostPublishingStatus;
  publishedUrl?: string;
  errorDetail?: string;
  retryCount: number;
  idempotencyKey: string;
  createdAt: string;
}

export type LeadLifecycleStage =
  | 'subscriber'
  | 'lead'
  | 'mql'
  | 'sql'
  | 'opportunity'
  | 'customer';

export type ConsentStatus = 'opted_in' | 'pending' | 'unsubscribed';

export interface AutoBuzzLead {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  sourceSignalId?: string;
  utmCampaign?: string;
  consentStatus: ConsentStatus;
  lifecycleStage: LeadLifecycleStage;
  notes: string[];
  assignedTo?: string;
  createdAt: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  label: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface AutoBuzzWorkflow {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  isActive: boolean;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  executionCount: number;
  successCount: number;
  failureCount: number;
  lastExecutedAt?: string;
  createdAt: string;
}

export interface WorkflowExecutionLog {
  id: string;
  workflowId: string;
  nodeId: string;
  status: 'running' | 'success' | 'failed' | 'retrying';
  payload: Record<string, any>;
  errorMessage?: string;
  executedAt: string;
}

export interface IntegrationAccount {
  id: string;
  provider: 'meta' | 'youtube' | 'tiktok' | 'google_analytics' | 'google_search_console' | 'brevo' | 'resend' | 'n8n' | 'supabase';
  accountName: string;
  isConnected: boolean;
  statusMessage: string;
  permissions: string[];
  tokenExpiresAt?: string;
  quotaUsed?: number;
  quotaLimit?: number;
}
