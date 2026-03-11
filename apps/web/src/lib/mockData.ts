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
  // ── Committed partners (live redirect) ─────────────────────────────────────
  {
    partnerId: 'PTR-ADP',
    partnerName: 'Adapundi',
    partnerType: 'fintech',
    interestRate: 0.015,            // 1.5% flat/bulan
    rateType: 'flat',
    minTenor: 3,
    maxTenor: 12,
    minAmount: 5_000_000,
    maxAmount: 500_000_000,
    tags: ['Cepat Cair', 'Digital Apply', 'Tanpa Agunan'],
    estimatedMonthlyInstallment: 4_917_000,
    minScore: 500,
    externalUrl: 'https://h5-app.adapundi.com/?channel2=h5Olsera',
  },
  {
    partnerId: 'PTR-OCBC',
    partnerName: 'OCBC — KTA Cashbiz',
    partnerType: 'bank',
    interestRate: 0.0099,           // 0.99% flat/bulan (dari product sheet OCBC)
    rateType: 'flat',
    minTenor: 6,
    maxTenor: 36,
    minAmount: 25_000_000,
    maxAmount: 2_000_000_000,
    tags: ['Limit s/d Rp 2M', 'Bunga Kompetitif', 'Provisi 1%'],
    estimatedMonthlyInstallment: 4_662_000,
    minScore: 600,
    comingSoon: true,               // URL belum diterima dari OCBC
  },
  // ── Demo / simulation partners ──────────────────────────────────────────────
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

// ─── Admin Dashboard Data ─────────────────────────────────────────────────────

export const MOCK_ADMIN_STATS = {
  totalApplications: 2847,
  totalDelta: 12.3,
  activePartners: 24,
  partnersDelta: 4,
  slaBreaches: 3,
  breachesDelta: -1,
  totalVolume: 142_000_000_000,
  volumeDelta: 22.7,
};

export const MOCK_PARTNER_PERFORMANCE = [
  { id: 'PTR-ADP',  name: 'Adapundi',     apps: 312,  badge: 'excellent', approvalRate: 78, avgSlaHours: 0.5,  isLive: true },
  { id: 'PTR-OCBC', name: 'OCBC',         apps: 0,    badge: 'good',      approvalRate: 0,  avgSlaHours: 0,    isLive: false, comingSoon: true },
  { id: 'PTR-001',  name: 'Bank Mandiri', apps: 1240, badge: 'excellent', approvalRate: 68, avgSlaHours: 2.1,  isLive: false },
  { id: 'PTR-002',  name: 'BCA Finance',  apps: 891,  badge: 'excellent', approvalRate: 72, avgSlaHours: 1.8,  isLive: false },
  { id: 'PTR-003',  name: 'Modalku',      apps: 456,  badge: 'good',      approvalRate: 65, avgSlaHours: 3.2,  isLive: false },
  { id: 'PTR-004',  name: 'Kredivo',      apps: 260,  badge: 'warning',   approvalRate: 58, avgSlaHours: 4.5,  isLive: false },
];

export const MOCK_SLA_ALERTS = [
  { partnerId: 'PTR-004', partnerName: 'Kredivo',   type: 'warning', message: 'Avg response 4.5 jam / target: 3 jam' },
  { partnerId: 'PTR-003', partnerName: 'Amartha',   type: 'breach',  message: '2 aplikasi melebihi batas SLA 24 jam' },
];

export const MOCK_SYSTEM_HEALTH = {
  apiUptime: 99.98,
  avgResponseMs: 124,
  activeSessions: 1247,
};

// ─── Admin Application Management Data ───────────────────────────────────────

export const MOCK_ALL_APPLICATIONS = [
  { applicationId: 'APP-94725183', merchantId: 'MER-45821', merchantName: 'Toko Sejahtera',    partner: 'Bank Mandiri', amount: 50_000_000,  status: 'pending'    as const, slaRemainingSeconds: 5025,   submittedAt: '2026-03-08T20:00:00.000Z' },
  { applicationId: 'APP-94725182', merchantId: 'MER-45820', merchantName: 'Warung Maju',       partner: 'BCA Finance',  amount: 25_000_000,  status: 'reviewing'  as const, slaRemainingSeconds: 3072,   submittedAt: '2026-03-08T18:00:00.000Z' },
  { applicationId: 'APP-94725181', merchantId: 'MER-45819', merchantName: 'Toko Berkah',       partner: 'Modalku',      amount: 100_000_000, status: 'approved'   as const, slaRemainingSeconds: 0,       submittedAt: '2026-03-07T10:00:00.000Z' },
  { applicationId: 'APP-94725180', merchantId: 'MER-45818', merchantName: 'Kios Makmur',       partner: 'Kredivo',      amount: 15_000_000,  status: 'rejected'   as const, slaRemainingSeconds: 0,       submittedAt: '2026-03-06T09:00:00.000Z' },
  { applicationId: 'APP-94725179', merchantId: 'MER-45817', merchantName: 'Toko Sumber Rezeki',partner: 'Bank Mandiri', amount: 75_000_000,  status: 'pending'    as const, slaRemainingSeconds: 8130,   submittedAt: '2026-03-08T22:00:00.000Z' },
  { applicationId: 'APP-94725178', merchantId: 'MER-45816', merchantName: 'Warung Barokah',    partner: 'Amartha',      amount: 30_000_000,  status: 'sla_breach' as const, slaRemainingSeconds: 0,       submittedAt: '2026-03-06T08:00:00.000Z' },
];

// ─── Partner Approval Queue ───────────────────────────────────────────────────

export const MOCK_PARTNER_QUEUE = [
  {
    id: 'PQ-001', name: 'PT. Finansial Digital Nusantara', type: 'fintech',      contact: 'Irfan Dhana',
    currentStage: 'API Security Review', progress: 85, risk: 'low',
    slaLabel: '3d', slaStatus: 'ok', submittedAt: '2026-02-10',
  },
  {
    id: 'PQ-002', name: 'Bank Sejahtera Tbk',               type: 'bank',         contact: 'Nurul Fitri',
    currentStage: 'Legal Docs',          progress: 34, risk: 'low',
    slaLabel: '6d', slaStatus: 'ok', submittedAt: '2026-02-18',
  },
  {
    id: 'PQ-003', name: 'Koperasi Maju Bersama',            type: 'multifinance', contact: 'Budi Santoso',
    currentStage: 'KYC AML',             progress: 22, risk: 'medium',
    slaLabel: '4d', slaStatus: 'warning', submittedAt: '2026-02-22',
  },
  {
    id: 'PQ-004', name: 'PT. Pinjaman Modal Rakyat',        type: 'fintech',      contact: 'Linda Sari',
    currentStage: 'Trustera Meeting',    progress: 67, risk: 'high',
    slaLabel: '8d', slaStatus: 'overdue', submittedAt: '2026-02-05',
  },
];

// ─── Data Intelligence ────────────────────────────────────────────────────────

export const MOCK_SCORE_FACTORS = [
  { factor: 'Transaction Volume',  description: 'Monthly transaction count and consistency', weight: 25, score: 820 },
  { factor: 'Revenue Growth',      description: 'YoY and short-term growth trajectory',       weight: 20, score: 755 },
  { factor: 'Average Ticket Size', description: 'Average transaction value stability',         weight: 15, score: 690 },
  { factor: 'Business Duration',   description: 'Time using Olsera platform',                  weight: 15, score: 710 },
  { factor: 'Category Performance',description: 'Product mix and diversification',             weight: 10, score: 640 },
  { factor: 'Payment Patterns',    description: 'Settlement behavior and timing',              weight: 10, score: 780 },
  { factor: 'Seasonality Index',   description: 'Business predictability score',               weight: 5,  score: 620 },
];

export const MOCK_DATA_ACCESS_LOGS = [
  { timestamp: '2026-03-12 16:28:12', partner: 'Bank Mandiri',  merchantId: 'MER-45621', dataType: 'Aggregate', action: 'Read', status: 'Authorized' },
  { timestamp: '2026-03-12 15:45:12', partner: 'BCA Finance',   merchantId: 'MER-45624', dataType: 'Aggregate', action: 'Read', status: 'Authorized' },
  { timestamp: '2026-03-12 14:33:45', partner: 'Modalku',       merchantId: 'MER-45618', dataType: 'Aggregate', action: 'Read', status: 'Authorized' },
  { timestamp: '2026-03-12 13:28:23', partner: 'Kredivo',       merchantId: 'MER-45618', dataType: 'Aggregate', action: 'Read', status: 'Authorized' },
];

// ─── Executive Dashboard ──────────────────────────────────────────────────────

export const MOCK_EXEC_STATS = {
  totalApplications: 12_847,    appsDelta: 13.9,
  approvalRate: 68.2,           approvalDelta: 3.8,
  totalVolume: 142_000_000_000, volumeDelta: 18.2,
  conversionRate: 94.5,         conversionDelta: 4.7,
};

export const MOCK_ECOSYSTEM_FLOW = {
  merchants: 12_847,
  mitraScore: 782,
  capitalSources: 24,
};

export const MOCK_PARTNER_YIELD = [
  { name: 'Adapundi',      apps: 312,  volume: 4_680_000_000,  approvalRate: 78, isLive: true },
  { name: 'Bank Mandiri',  apps: 5240, volume: 48_200_000_000, approvalRate: 68, isLive: false },
  { name: 'BCA Finance',   apps: 3897, volume: 39_700_000_000, approvalRate: 72, isLive: false },
  { name: 'Modalku',       apps: 2514, volume: 24_500_000_000, approvalRate: 65, isLive: false },
  { name: 'Kredivo',       apps: 1196, volume: 10_600_000_000, approvalRate: 58, isLive: false },
];

export const MOCK_MERCHANT_GROWTH = [
  { month: 'Oct', count: 1420 },
  { month: 'Nov', count: 1640 },
  { month: 'Dec', count: 1950 },
  { month: 'Jan', count: 2240 },
  { month: 'Feb', count: 2580 },
  { month: 'Mar', count: 2880 },
];

export const MOCK_STRATEGIC_METRICS = {
  digitalPenetration: 34.2,
  retentionRate: 91.8,
  npsScore: 72,
};
