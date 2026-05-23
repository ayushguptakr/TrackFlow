import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlinePlayCircle } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import { getDashboardPath } from '../../utils/roleRedirect';
import { TRUST_STATS } from './data';
import DashboardMockup from './DashboardMockup';
import LandingButton from './LandingButton';
import MotionReveal from './MotionReveal';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-50" />
        <div className="absolute top-1/3 -left-16 h-56 w-56 rounded-full bg-zinc-100" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <MotionReveal>
            <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm">
              Now in public beta — built for modern teams
            </span>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem]">
              Manage issues, tickets, and workflows{' '}
              <span className="text-indigo-600">effortlessly.</span>
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
              TrackFlow gives support, engineering, and operations teams a single
              place to triage tickets, collaborate in real time, and ship resolutions
              faster—with clarity at every step.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
            <LandingButton
              to={isAuthenticated ? getDashboardPath() : ROUTES.REGISTER}
              className="group"
            >
              Get Started
              <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </LandingButton>
            <LandingButton href="#preview" variant="secondary">
              <HiOutlinePlayCircle className="h-5 w-5 text-indigo-600" />
              Live Demo
            </LandingButton>
          </MotionReveal>

          <MotionReveal delay={0.2} className="mt-10 flex flex-wrap gap-8 border-t border-zinc-200 pt-8">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </MotionReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full min-w-0"
        >
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm sm:p-4">
            <DashboardMockup compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
