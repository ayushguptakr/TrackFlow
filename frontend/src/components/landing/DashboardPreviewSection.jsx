import { HiOutlineCheckCircle } from 'react-icons/hi2';
import DashboardMockup from './DashboardMockup';
import MotionReveal from './MotionReveal';
import SectionHeader from './SectionHeader';

const HIGHLIGHTS = [
  'Live ticket queue with status badges',
  'Analytics cards and weekly volume charts',
  'Priority filters and assignment controls',
  'Role-aware views for admin and support',
];

const DashboardPreviewSection = () => (
  <section id="preview" className="scroll-mt-24 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <SectionHeader
            badge="Product"
            title="A dashboard your team will actually use"
            description="Clean layouts, actionable metrics, and ticket tables designed for daily operations—not demos."
            align="left"
          />

          <MotionReveal delay={0.1} className="mt-8 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                <p className="text-sm text-zinc-600">{item}</p>
              </div>
            ))}
          </MotionReveal>
        </div>

        <MotionReveal delay={0.15} className="relative w-full min-w-0">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm sm:p-4">
            <DashboardMockup />
          </div>
        </MotionReveal>
      </div>
    </div>
  </section>
);

export default DashboardPreviewSection;
