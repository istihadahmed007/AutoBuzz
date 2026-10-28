import {
  AutoBuzzWorkflow,
  WorkflowNode,
  WorkflowEdge,
  WorkflowExecutionLog,
} from '../types/autobuzz';

export const INITIAL_AUTOBUZZ_WORKFLOWS: AutoBuzzWorkflow[] = [
  {
    id: 'wf-a-website-launch',
    workspaceId: 'default-workspace',
    name: 'Workflow A — Website Launch Campaign',
    description: 'Detects a new product or article signal, creates a bilingual story draft, and sends for approval.',
    isActive: true,
    executionCount: 14,
    successCount: 14,
    failureCount: 0,
    lastExecutedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Signal Detected: Product / Launch', config: { category: 'product_launch' }, position: { x: 50, y: 150 } },
      { id: 'n2', type: 'action', label: 'Synthesize Bilingual Story', config: { tone: 'persuasive', languages: ['en', 'bn'] }, position: { x: 280, y: 150 } },
      { id: 'n3', type: 'action', label: 'Build UTM Attribution Links', config: { medium: 'social_automation' }, position: { x: 510, y: 150 } },
      { id: 'n4', type: 'action', label: 'Queue in Approval Inbox', config: { notifyAdmin: true }, position: { x: 740, y: 150 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
    ],
  },
  {
    id: 'wf-b-lead-capture',
    workspaceId: 'default-workspace',
    name: 'Workflow B — Inbound Lead Capture & Qualification',
    description: 'Validates web form submissions, records consent, tags the lead, and creates a 24h follow-up task.',
    isActive: true,
    executionCount: 28,
    successCount: 28,
    failureCount: 0,
    lastExecutedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Website Form Submission', config: { formId: 'contact-inbound' }, position: { x: 50, y: 150 } },
      { id: 'n2', type: 'condition', label: 'Check Verified Consent', config: { requireOptIn: true }, position: { x: 280, y: 150 } },
      { id: 'n3', type: 'action', label: 'Save CRM Lead & Lifecycle: SQL', config: { assignLifecycle: 'sql' }, position: { x: 510, y: 150 } },
      { id: 'n4', type: 'action', label: 'Create 24h Sales Follow-Up Task', config: { priority: 'high', dueHours: 24 }, position: { x: 740, y: 150 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
    ],
  },
  {
    id: 'wf-c-lead-nurture',
    workspaceId: 'default-workspace',
    name: 'Workflow C — Smart Lead Follow-Up Sequence',
    description: 'Sends approved follow-up email communications, halting automatically upon conversion or unsubscribe.',
    isActive: true,
    executionCount: 19,
    successCount: 19,
    failureCount: 0,
    lastExecutedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Lead Enters Campaign Tag', config: { tag: 'nurture_lead' }, position: { x: 50, y: 150 } },
      { id: 'n2', type: 'action', label: 'Send Welcome Briefing Email', config: { provider: 'brevo' }, position: { x: 280, y: 150 } },
      { id: 'n3', type: 'delay', label: 'Wait 48 Hours', config: { durationHours: 48 }, position: { x: 510, y: 150 } },
      { id: 'n4', type: 'condition', label: 'Halt if Converted or Unsubscribed', config: { checkLifecycle: 'customer' }, position: { x: 740, y: 150 } },
      { id: 'n5', type: 'action', label: 'Send Customer Case Study', config: { templateId: 'case-study-1' }, position: { x: 970, y: 150 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
      { id: 'e4', source: 'n4', target: 'n5' },
    ],
  },
  {
    id: 'wf-d-seo-monitoring',
    workspaceId: 'default-workspace',
    name: 'Workflow D — SEO Performance & Indexing Radar',
    description: 'Retrieves authorized Search Console metrics, spots keyword drops, and queues recommendations for review.',
    isActive: true,
    executionCount: 8,
    successCount: 8,
    failureCount: 0,
    lastExecutedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Weekly Search Performance Audit', config: { interval: 'weekly' }, position: { x: 50, y: 150 } },
      { id: 'n2', type: 'action', label: 'Analyze GSC Clicks & Query Trends', config: { thresholdDrop: 0.15 }, position: { x: 280, y: 150 } },
      { id: 'n3', type: 'action', label: 'Propose Title & Meta Description', config: { requireHumanReview: true }, position: { x: 510, y: 150 } },
      { id: 'n4', type: 'action', label: 'Queue SEO Review Task', config: { category: 'search_opportunity' }, position: { x: 740, y: 150 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
    ],
  },
  {
    id: 'wf-e-weekly-digest',
    workspaceId: 'default-workspace',
    name: 'Workflow E — Executive Campaign & Growth Report',
    description: 'Aggregates connected source telemetry every Monday and drafts an executive digest.',
    isActive: true,
    executionCount: 6,
    successCount: 6,
    failureCount: 0,
    lastExecutedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Monday 09:00 AM Cron Schedule', config: { cron: '0 9 * * 1' }, position: { x: 50, y: 150 } },
      { id: 'n2', type: 'action', label: 'Collect Lead & Revenue Data', config: { sources: ['crm', 'social'] }, position: { x: 280, y: 150 } },
      { id: 'n3', type: 'action', label: 'Draft Executive Growth Digest', config: { format: 'markdown' }, position: { x: 510, y: 150 } },
      { id: 'n4', type: 'action', label: 'Dispatch to Marketing Leadership', config: { channel: 'email' }, position: { x: 740, y: 150 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
    ],
  },
  {
    id: 'wf-f-error-recovery',
    workspaceId: 'default-workspace',
    name: 'Workflow F — Diagnostic Logging & Error Recovery',
    description: 'Catches failed workflow nodes, safely retries temporary glitches up to 3 times, and alerts admins.',
    isActive: true,
    executionCount: 4,
    successCount: 4,
    failureCount: 0,
    lastExecutedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Catch Execution Exception / Timeout', config: { maxRetries: 3 }, position: { x: 50, y: 150 } },
      { id: 'n2', type: 'action', label: 'Record Diagnostic Error Trace', config: { sanitize: true }, position: { x: 280, y: 150 } },
      { id: 'n3', type: 'condition', label: 'Retry Counter < 3?', config: { backoffSeconds: 60 }, position: { x: 510, y: 150 } },
      { id: 'n4', type: 'action', label: 'Notify Workspace Administrator', config: { urgent: true }, position: { x: 740, y: 150 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
    ],
  },
];

export class AutomationRunner {
  public static validateGraph(nodes: WorkflowNode[], edges: WorkflowEdge[]): { isValid: boolean; error?: string } {
    if (!nodes || nodes.length < 2) {
      return { isValid: false, error: 'Workflow must have at least one trigger and one target node.' };
    }
    const hasTrigger = nodes.some((n) => n.type === 'trigger');
    if (!hasTrigger) {
      return { isValid: false, error: 'Workflow must start with an explicit trigger node.' };
    }
    const nodeIds = new Set(nodes.map((n) => n.id));
    for (const edge of edges) {
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        return { isValid: false, error: `Invalid edge reference: ${edge.source} -> ${edge.target}` };
      }
    }
    return { isValid: true };
  }

  public static async executeTestRun(
    workflow: AutoBuzzWorkflow,
    testPayload: Record<string, any>
  ): Promise<{ success: boolean; logs: WorkflowExecutionLog[] }> {
    const logs: WorkflowExecutionLog[] = [];
    const orderedNodes = workflow.nodes;

    for (const node of orderedNodes) {
      const now = new Date().toISOString();
      logs.push({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        workflowId: workflow.id,
        nodeId: node.id,
        status: 'success',
        payload: { nodeLabel: node.label, nodeType: node.type, payload: testPayload },
        executedAt: now,
      });
    }

    return { success: true, logs };
  }
}
