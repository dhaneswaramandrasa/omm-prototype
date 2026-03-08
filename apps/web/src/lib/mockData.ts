import type {
  Merchant,
  MitraScore,
  Partner,
  ApplicationListItem,
  PartnerApplicationListItem,
  PartnerApplicationDetail,
  ApplicationDetail,
  IneligiblePartner,
} from '@omm/shared';

// ─── Demo Users ───────────────────────────────────────────────────────────────

export const DEMO_CREDENTIALS: Record<string, { password: string; name: string; role: string; merchantId?: string; partnerId?: string }> = {
  'merchant@demo.com':       { password: 'demo123', name: 'Toko Elektronik Jaya', role: 'merchant', merchantId: 'MER-001' },
  'partner.mandiri@demo.com':{ password: 'demo123', name: 'Bank Mandiri',          role: 'partner',  partnerId:  'PTR-001' },
  'admin@olsera.com':        { password: 'demo123', name: 'Admin Olsera',          role: 'admin' },
  'data@olsera.com':         { password: 'demo123', name: 'Data Team',             role: 'data' },
  'coo@olsera.com':          { password: 'demo123', name: 'COO Olsera',            role: 'management' },
};

// ─── Merchant ─────────────────────────────────────────────────────────────────

export const MOCK_MERCHANT: Merchant = {
  merchantId: 'MER-001',
  merchantCode: 'OLS-MER-00142',
  businessName: 'Toko Elektronik Jaya',
  ownerName: 'Budi Santoso',
  phone: '081234567890',
  category: 'Elektronik',
  registeredAt: '2023-01-15T00:00:00.000Z',
  stores: [
    { id: 'STR-001', storeName: 'Toko Elektronik Jaya', location: 'Jakarta Barat', monthlyRevenue: 125_000_000, status: 'active' },
    { id: 'STR-002', storeName: 'Warung Makan Sedap',   location: 'Tangerang',     monthlyRevenue: 18_500_000,  status: 'active' },
    { id: 'STR-003', storeName: 'Fashion Store',        location: 'Tangerang',     monthlyRevenue: 12_500_000,  status: 'inactive' },
  ],
};

export const MOCK_MITRA_SCORE: MitraScore = {
  mitraScore: 742,
  atriScore: 742,
  tier: 'good',
  tierLabel: 'Good',
  percentile: 78,
  maxScore: 850,
  delta: 24,
  calculatedAt: '2026-03-08T00:00:00.000Z',
  factors: {
    monthlyRevenue:        { score: 820, weight: 0.30 },
    growthRate:            { score: 750, weight: 0.25 },
    transactionConsistency:{ score: 680, weight: 0.20 },
    tenureOnPlatform:      { score: 700, weight: 0.15 },
    categoryRisk:          { score: 790, weight: 0.10 },
  },
};

// ─── Partners ─────────────────────────────────────────────────────────────────

export const MOCK_PARTNERS: Partner[] = [
  {
    partnerId: 'PTR-001',
    partnerName: 'Bank Mandiri',
    partnerType: 'bank',
    interestRate: 0.125,
    rateType: 'effective',
    minTenor: 6,
    maxTenor: 36,
    tags: ['Bunga Tetap', 'Proses Cepat'],
    estimatedMonthlyInstallment: 4_480_000,
    minScore: 600,
  },
  {
    partnerId: 'PTR-002',
    partnerName: 'BCA Finance',
    partnerType: 'bank',
    interestRate: 0.108,
    rateType: 'flat',
    minTenor: 3,
    maxTenor: 24,
    tags: ['Cicilan Tetap', 'Tanpa Agunan'],
    estimatedMonthlyInstallment: 4_617_000,
    minScore: 650,
  },
  {
    partnerId: 'PTR-003',
    partnerName: 'Modalku',
    partnerType: 'fintech',
    interestRate: 0.155,
    rateType: 'flat',
    minTenor: 3,
    maxTenor: 12,
    tags: ['Cepat Cair', 'Tanpa Jaminan'],
    estimatedMonthlyInstallment: 4_812_000,
    minScore: 500,
  },
  {
    partnerId: 'PTR-004',
    partnerName: 'Amartha',
    partnerType: 'fintech',
    interestRate: 0.142,
    rateType: 'effective',
    minTenor: 3,
    maxTenor: 24,
    tags: ['Fleksibel'],
    estimatedMonthlyInstallment: 4_730_000,
    minScore: 520,
  },
];

export const MOCK_INELIGIBLE_PARTNERS: IneligiblePartner[] = [
  {
    partnerId: 'PTR-005',
    partnerName: 'Kredivo',
    partnerType: 'fintech',
    reason: 'tenor_out_of_range',
    reasonLabel: 'Tenor 12 bulan tidak masuk dalam range 6–36 bulan',
  },
];

// ─── Merchant Applications ────────────────────────────────────────────────────

export const MOCK_MY_APPLICATIONS: ApplicationListItem[] = [
  {
    applicationId: 'APP-77082553',
    partnerName: 'Bank Mandiri',
    amount: 50_000_000,
    tenorMonths: 12,
    status: 'reviewing',
    submittedAt: '2026-03-08T20:38:00.000Z',
    lastUpdated: '2026-03-08T21:00:00.000Z',
  },
  {
    applicationId: 'APP-44723821',
    partnerName: 'BCA Finance',
    amount: 25_000_000,
    tenorMonths: 6,
    status: 'approved',
    submittedAt: '2026-01-10T10:00:00.000Z',
    lastUpdated: '2026-01-12T14:30:00.000Z',
  },
  {
    applicationId: 'APP-19283745',
    partnerName: 'Modalku',
    amount: 15_000_000,
    tenorMonths: 3,
    status: 'rejected',
    submittedAt: '2025-11-20T09:15:00.000Z',
    lastUpdated: '2025-11-22T16:00:00.000Z',
  },
];

export const MOCK_APPLICATION_DETAIL: ApplicationDetail = {
  applicationId: 'APP-77082553',
  partnerName: 'Bank Mandiri',
  amount: 50_000_000,
  tenorMonths: 12,
  mitraScoreAtApply: 742,
  status: 'reviewing',
  submittedAt: '2026-03-08T20:38:00.000Z',
  timeline: [
    { stage: 'submitted',       status: 'done',        timestamp: '2026-03-08T20:38:00.000Z' },
    { stage: 'partner_review',  status: 'in_progress', timestamp: '2026-03-08T21:00:00.000Z' },
    { stage: 'credit_assessment', status: 'pending',   timestamp: null },
    { stage: 'final_decision',  status: 'pending',     timestamp: null },
  ],
  decision: null,
};

// ─── Partner Dashboard Data ───────────────────────────────────────────────────

export const MOCK_PARTNER_STATS = {
  totalApplications: 2847,
  totalDelta: 12.3,
  pendingReview: 43,
  pendingDelta: 8.5,
  approvedRate: 68,
  approvedDelta: 3.2,
  totalDisbursed: 4_200_000_000,
  disbursedDelta: 18.7,
  partnerName: 'Bank Mandiri',
  partnerId: 'PTR-001',
};

export const MOCK_PARTNER_APPLICATIONS: PartnerApplicationListItem[] = [
  {
    applicationId: 'APP-74735181',
    merchantName: 'Toko Sejahtera',
    merchantId: 'MER-012',
    mitraScore: 850,
    mitraTier: 'excellent',
    amount: 50_000_000,
    tenorMonths: 12,
    status: 'pending',
    slaRemainingSeconds: 5025,
    submittedAt: '2026-03-08T20:00:00.000Z',
  },
  {
    applicationId: 'APP-74735182',
    merchantName: 'Warung Maju',
    merchantId: 'MER-043',
    mitraScore: 720,
    mitraTier: 'good',
    amount: 25_000_000,
    tenorMonths: 6,
    status: 'reviewing',
    slaRemainingSeconds: 12_600,
    submittedAt: '2026-03-08T18:00:00.000Z',
  },
  {
    applicationId: 'APP-74735183',
    merchantName: 'Toko Berkah',
    merchantId: 'MER-021',
    mitraScore: 890,
    mitraTier: 'excellent',
    amount: 100_000_000,
    tenorMonths: 24,
    status: 'reviewing',
    slaRemainingSeconds: 1320,
    submittedAt: '2026-03-08T10:00:00.000Z',
  },
  {
    applicationId: 'APP-74735184',
    merchantName: 'Usaha Mandiri',
    merchantId: 'MER-067',
    mitraScore: 580,
    mitraTier: 'fair',
    amount: 10_000_000,
    tenorMonths: 3,
    status: 'pending',
    slaRemainingSeconds: 36_000,
    submittedAt: '2026-03-09T06:00:00.000Z',
  },
];

export const MOCK_PARTNER_APP_DETAIL: PartnerApplicationDetail = {
  applicationId: 'APP-74735181',
  merchantId: 'MER-012',
  merchantName: 'Toko Sejahtera',
  amount: 50_000_000,
  tenorMonths: 12,
  mitraScore: 850,
  mitraTier: 'excellent',
  status: 'pending',
  submittedAt: '2026-03-08T20:00:00.000Z',
  merchantData: {
    monthlyRevenue: 125_000_000,
    growthRate: 0.185,
    avgTransactionValue: 87_500,
    monthlyTransactionVolume: 1429,
    platformTenureMonths: 18,
    peakSalesDay: 'Jumat',
    topCategories: ['Elektronik', 'Fashion', 'Makanan'],
  },
  consentProof: {
    consentId: 'CNS-34461357',
    consentedAt: '2026-03-08T20:00:11.000Z',
  },
  slaRemainingSeconds: 5025,
  decision: null,
};
