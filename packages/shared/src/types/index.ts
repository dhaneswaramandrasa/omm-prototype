// ─── Enums / Unions ──────────────────────────────────────────────────────────

export type ApplicationStatus =
  | 'pending'
  | 'reviewing'
  | 'approved'
  | 'rejected'
  | 'sla_breach';

export type MitraTier = 'excellent' | 'good' | 'fair' | 'poor';

export type PartnerType = 'bank' | 'fintech' | 'multifinance';

export type RateType = 'effective' | 'flat';

export type TimelineStage =
  | 'submitted'
  | 'partner_review'
  | 'credit_assessment'
  | 'final_decision';

export type TimelineStageStatus = 'done' | 'in_progress' | 'pending';

// ─── API Envelope ─────────────────────────────────────────────────────────────

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta?: ApiMeta;
  error: { code: string; message: string } | null;
}

// ─── Merchant ─────────────────────────────────────────────────────────────────

export interface MerchantStore {
  id: string;
  storeName: string;
  location: string;
  monthlyRevenue: number;
  status: 'active' | 'inactive';
}

export interface Merchant {
  merchantId: string;
  merchantCode: string;
  businessName: string;
  ownerName: string;
  phone: string;
  category: string;
  registeredAt: string;
  stores: MerchantStore[];
}

// ─── MitraScore ───────────────────────────────────────────────────────────────

export interface ScoreFactor {
  score: number;
  weight: number;
}

export interface MitraScore {
  mitraScore: number;
  atriScore: number;
  tier: MitraTier;
  tierLabel: string;
  percentile: number;
  maxScore: number;
  delta: number;
  calculatedAt: string;
  factors: {
    monthlyRevenue: ScoreFactor;
    growthRate: ScoreFactor;
    transactionConsistency: ScoreFactor;
    tenureOnPlatform: ScoreFactor;
    categoryRisk: ScoreFactor;
  };
}

// ─── Partner ──────────────────────────────────────────────────────────────────

export interface Partner {
  partnerId: string;
  partnerName: string;
  partnerType: PartnerType;
  interestRate: number;
  rateType: RateType;
  minTenor: number;
  maxTenor: number;
  tags: string[];
  estimatedMonthlyInstallment: number;
  minScore: number;
}

export interface IneligiblePartner {
  partnerId: string;
  partnerName: string;
  partnerType: PartnerType;
  reason: string;
  reasonLabel: string;
}

// ─── Application ─────────────────────────────────────────────────────────────

export interface TimelineEvent {
  stage: TimelineStage;
  status: TimelineStageStatus;
  timestamp: string | null;
}

export interface ApplicationDecision {
  decision: 'approved' | 'rejected';
  decidedAt: string;
  notes: string;
  rejectionReason?: string;
}

export interface ApplicationListItem {
  applicationId: string;
  partnerName: string;
  amount: number;
  tenorMonths: number;
  status: ApplicationStatus;
  submittedAt: string;
  lastUpdated: string;
}

export interface ApplicationDetail {
  applicationId: string;
  partnerName: string;
  amount: number;
  tenorMonths: number;
  mitraScoreAtApply: number;
  status: ApplicationStatus;
  submittedAt: string;
  timeline: TimelineEvent[];
  decision: ApplicationDecision | null;
}

// ─── Partner Application (partner portal view) ────────────────────────────────

export interface PartnerApplicationListItem {
  applicationId: string;
  merchantName: string;
  merchantId: string;
  mitraScore: number;
  mitraTier: MitraTier;
  amount: number;
  tenorMonths: number;
  status: ApplicationStatus;
  slaRemainingSeconds: number;
  submittedAt: string;
}

export interface MerchantData {
  monthlyRevenue: number;
  growthRate: number;
  avgTransactionValue: number;
  monthlyTransactionVolume: number;
  platformTenureMonths: number;
  peakSalesDay: string;
  topCategories: string[];
}

export interface PartnerApplicationDetail {
  applicationId: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  tenorMonths: number;
  mitraScore: number;
  mitraTier: MitraTier;
  status: ApplicationStatus;
  submittedAt: string;
  merchantData: MerchantData;
  consentProof: {
    consentId: string;
    consentedAt: string;
  };
  slaRemainingSeconds: number;
  decision: ApplicationDecision | null;
}

// ─── SLAConfig ────────────────────────────────────────────────────────────────

export interface SLAConfig {
  partnerId: string;
  partnerName: string;
  targetResponseHours: number;
  warningThresholdHours: number;
  breachThresholdHours: number;
  currentAvgResponseHours: number;
  healthStatus: 'excellent' | 'good' | 'warning' | 'breach';
}
