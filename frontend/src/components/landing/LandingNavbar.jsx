import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { APP_NAME, ROUTES } from '../../utils/constants';
import { getDashboardPath } from '../../utils/roleRedirect';
import { NAV_LINKS } from './data';
import LandingButton from './LandingButton';

const LandingNavbar = () => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-zinc-200 bg-white shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            T
          </span>
          {APP_NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <LandingButton to={getDashboardPath()} variant="primary">
              Dashboard
            </LandingButton>
          ) : (
            <>
              <LandingButton to={ROUTES.LOGIN} variant="secondary" className="px-4 py-2">
                Sign in
              </LandingButton>
              <LandingButton to={ROUTES.REGISTER} variant="primary" className="px-4 py-2">
                Get Started
              </LandingButton>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <HiOutlineXMark className="h-6 w-6" />
          ) : (
            <HiOutlineBars3 className="h-6 w-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-zinc-200 bg-white md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-zinc-100 pt-4">
                {isAuthenticated ? (
                  <LandingButton to={getDashboardPath()} onClick={closeMobile}>
                    Dashboard
                  </LandingButton>
                ) : (
                  <>
                    <LandingButton
                      to={ROUTES.LOGIN}
                      variant="secondary"
                      onClick={closeMobile}
                    >
                      Sign in
                    </LandingButton>
                    <LandingButton
                      to={ROUTES.REGISTER}
                      onClick={closeMobile}
                    >
                      Get Started
                    </LandingButton>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LandingNavbar;
