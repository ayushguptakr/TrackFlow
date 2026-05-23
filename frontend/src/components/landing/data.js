import {
  HiOutlineChartBarSquare,
  HiOutlineClipboardDocumentList,
  HiOutlineFunnel,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineBolt,
} from 'react-icons/hi2';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Product', href: '#preview' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const TRUST_STATS = [
  { value: '12k+', label: 'Tickets resolved' },
  { value: '98%', label: 'Uptime SLA' },
  { value: '4.9/5', label: 'Team rating' },
];

export const FEATURES = [
  {
    icon: HiOutlineClipboardDocumentList,
    title: 'Ticket Management',
    description:
      'Create, categorize, and track issues with a structured workflow built for support and engineering teams.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Role-Based Access',
    description:
      'Admin, support, and user roles with precise permissions so the right people see the right data.',
  },
  {
    icon: HiOutlineBolt,
    title: 'Real-Time Status Tracking',
    description:
      'Move tickets from open to resolved with live status updates and a clear activity timeline.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Team Collaboration',
    description:
      'Assign agents, comment in context, and keep every stakeholder aligned on resolution progress.',
  },
  {
    icon: HiOutlineChartBarSquare,
    title: 'Dashboard Analytics',
    description:
      'Visualize volume, resolution trends, and team performance with actionable admin insights.',
  },
  {
    icon: HiOutlineFunnel,
    title: 'Priority & Filters',
    description:
      'Slice tickets by priority, category, and status with powerful search and sorting controls.',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Create Ticket',
    description:
      'Submit issues with priority, category, and rich descriptions in seconds from any device.',
  },
  {
    step: '02',
    title: 'Assign & Track',
    description:
      'Route work to the right agent, update status, and follow every change in one timeline.',
  },
  {
    step: '03',
    title: 'Resolve Faster',
    description:
      'Close the loop with analytics, filters, and workflows that keep your queue moving.',
  },
];

export const STATS = [
  { key: 'tickets', end: 12840, suffix: '+', label: 'Active Tickets' },
  { key: 'teams', end: 320, suffix: '+', label: 'Teams Using' },
  { key: 'resolution', end: 94, suffix: '%', label: 'Resolution Rate' },
  { key: 'response', end: 2.4, suffix: 'h', label: 'Avg Response Time', decimals: 1 },
];

export const TESTIMONIALS = [
  {
    quote:
      'TrackFlow replaced three tools for our support team. The dashboard is clean, fast, and actually gets used daily.',
    name: 'Sarah Chen',
    role: 'Head of Support',
    company: 'Northline Systems',
  },
  {
    quote:
      'Role-based access and ticket filters saved us hours every week. It feels like a product built for real operations.',
    name: 'Marcus Webb',
    role: 'Engineering Manager',
    company: 'Atlas Digital',
  },
  {
    quote:
      'We shipped TrackFlow to the whole org in a day. Onboarding was smooth and the UI just makes sense.',
    name: 'Priya Nair',
    role: 'IT Operations Lead',
    company: 'Vertex Labs',
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#preview' },
    { label: 'Pricing', href: '#cta' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
};
