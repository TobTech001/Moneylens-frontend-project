export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const FEATURES = [
  { icon: 'card', title: 'Track Transactions', description: 'Automatically organize your income and spending.' },
  { icon: 'chart', title: 'Smart Analytics', description: 'Understand where your money goes with visual spending analytics.' },
  { icon: 'target', title: 'Budget Management', description: 'Create spending limits and monitor your progress.' },
  { icon: 'handshake', title: 'Borrow & Lend', description: "Keep track of money you've borrowed or lent." },
  { icon: 'bell', title: 'Subscription Tracking', description: 'Never lose track of recurring payments.' },
  { icon: 'bulb', title: 'Financial Insights', description: 'Get meaningful insights about your spending habits.' },
] as const;

export const HOW_IT_WORKS_STEPS = [
  { number: '01', title: 'Connect', description: 'Add your transactions and financial information.' },
  { number: '02', title: 'Track', description: 'MoneyLens organizes your spending and financial activity.' },
  { number: '03', title: 'Understand', description: 'Discover patterns, control spending, and make better financial decisions.' },
];

export type DashboardTab = 'overview' | 'analytics' | 'budget' | 'transactions';

export const DASHBOARD_TABS: { id: DashboardTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'budget', label: 'Budget' },
  { id: 'transactions', label: 'Transactions' },
];

export const ROTATING_INSIGHTS = [
  { text: 'Your food spending increased by 18% this month.', tone: 'warning' as const },
  { text: "You're ₦7,500 below your monthly budget.", tone: 'primary' as const },
  { text: 'You saved 12% more than last month.', tone: 'primary' as const },
];

export const INSIGHT_CARDS = [
  { icon: '🍔', title: 'Food Spending', amount: 47500, change: '+32% from last month', tone: 'warning' as const },
  { icon: '🚗', title: 'Transport', amount: 25200, change: 'Your second highest category', tone: 'accent' as const },
  { icon: '📺', title: 'Subscriptions', amount: 18500, change: '6 active subscriptions', tone: 'primary' as const },
];

export const ANALYTICS_CATEGORIES = [
  { category: 'Food', percentage: 39, icon: '🍔' },
  { category: 'Transport', percentage: 21, icon: '🚗' },
  { category: 'Bills', percentage: 15, icon: '💡' },
  { category: 'Data & Airtime', percentage: 13, icon: '📱' },
  { category: 'Shopping', percentage: 8, icon: '🛍️' },
  { category: 'Entertainment', percentage: 4, icon: '🎬' },
];

export const ANALYTICS_TREND = [38, 52, 41, 60, 47, 66, 58, 72, 50, 64, 45, 70];

export const BENEFITS = [
  { icon: 'eye', text: 'Know exactly where your money goes' },
  { icon: 'target', text: 'Reduce unnecessary spending' },
  { icon: 'shield', text: 'Stay within your budget' },
  { icon: 'bell', text: 'Track recurring expenses' },
  { icon: 'bulb', text: 'Understand financial habits' },
  { icon: 'chart', text: 'Make better financial decisions' },
];

export const TESTIMONIALS = [
  {
    name: 'Amara Chukwu',
    role: 'Freelance Designer',
    review: 'MoneyLens helped me realize how much I was spending on subscriptions every month. I cancelled three I forgot I had.',
    rating: 5,
    initials: 'AC',
  },
  {
    name: 'Tunde Bakare',
    role: 'Software Engineer',
    review: "Finally a finance app that doesn't feel like a spreadsheet. The insights actually tell me something useful.",
    rating: 5,
    initials: 'TB',
  },
  {
    name: 'Ngozi Eze',
    role: 'Small Business Owner',
    review: 'Tracking money I lend to family used to be all in my head. Now it just lives in one place.',
    rating: 4,
    initials: 'NE',
  },
  {
    name: 'Kelechi Obi',
    role: 'Product Manager',
    review: 'Set a budget for the first time in my life and actually stuck to it because I could see it happening in real time.',
    rating: 5,
    initials: 'KO',
  },
  {
    name: 'Fatima Bello',
    role: 'Graduate Student',
    review: 'The category breakdown made it obvious transport was quietly eating my monthly allowance.',
    rating: 5,
    initials: 'FB',
  },
];

export type BillingPeriod = 'monthly' | 'yearly';

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    tagline: 'Get started with the basics.',
    features: ['Transaction tracking', 'Basic analytics', 'Basic budgets', 'Basic insights'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 2500,
    yearlyPrice: 2500 * 12 * 0.8,
    tagline: 'For people serious about their money.',
    features: [
      'Unlimited transactions',
      'Advanced analytics',
      'Smart insights',
      'Subscription tracking',
      'Advanced budgets',
      'Borrow & Lend',
    ],
    cta: 'Start Pro',
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 4500,
    yearlyPrice: 4500 * 12 * 0.8,
    tagline: 'Everything, with room to grow.',
    features: [
      'Everything in Pro',
      'Advanced financial insights',
      'Priority features',
      'Extended analytics',
      'Premium tools',
    ],
    cta: 'Get Premium',
    highlighted: false,
  },
];

export const FAQ_ITEMS = [
  { question: 'What is MoneyLens?', answer: 'MoneyLens is a personal finance app that helps you understand where your money goes by organizing your transactions, tracking budgets, and surfacing spending insights automatically.' },
  { question: 'How does MoneyLens track my spending?', answer: 'You add or import your transactions, and MoneyLens automatically categorizes them into groups like Food, Transport, and Bills so you can see patterns at a glance.' },
  { question: 'Can I create budgets?', answer: 'Yes — set a spending limit for any category, weekly or monthly, and MoneyLens shows your progress and warns you as you approach the limit.' },
  { question: 'Can I track subscriptions?', answer: 'Yes. Add your recurring payments once and MoneyLens tracks billing dates, monthly cost, and upcoming charges automatically.' },
  { question: "Can I track money I've borrowed or lent?", answer: 'Yes — the Borrow & Lend feature keeps a running record of who owes you, who you owe, due dates, and partial payments.' },
  { question: 'Is MoneyLens available on mobile?', answer: 'MoneyLens is fully responsive and works on phones, tablets, and desktop browsers with the same features throughout.' },
  { question: 'Is my financial information secure?', answer: 'Your financial information is private and only visible within your own MoneyLens account. It is never shared or sold.' },
  { question: 'Can I export my financial data?', answer: 'Yes — you can export your transactions, budgets, and other MoneyLens data as a downloadable file at any time from Settings.' },
];

export const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Budget', href: '#features' },
    { label: 'Transactions', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Resources: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Help Center', href: '#' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};