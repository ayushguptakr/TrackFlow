import { HiOutlineArrowRight } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import { getDashboardPath } from '../../utils/roleRedirect';
import LandingButton from './LandingButton';
import MotionReveal from './MotionReveal';

const FinalCtaSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section id="cta" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              aria-hidden
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #52525b 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <p className="relative text-sm font-semibold uppercase tracking-wider text-indigo-300">
              Start today
            </p>
            <h2 className="relative mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to streamline your ticket workflow?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-zinc-400">
              Join teams using TrackFlow to manage issues with clarity, speed, and
              confidence. No credit card required.
            </p>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <LandingButton
                to={isAuthenticated ? getDashboardPath() : ROUTES.REGISTER}
                variant="primary"
                className="group bg-white text-zinc-900 hover:bg-zinc-100"
              >
                {isAuthenticated ? 'Open Dashboard' : 'Get Started Free'}
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </LandingButton>
              <LandingButton
                to={ROUTES.LOGIN}
                variant="secondary"
                className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800"
              >
                Sign in
              </LandingButton>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default FinalCtaSection;
