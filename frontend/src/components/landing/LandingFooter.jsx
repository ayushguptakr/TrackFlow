import { Link } from 'react-router-dom';
import {
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
} from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { APP_NAME, ROUTES } from '../../utils/constants';
import { FOOTER_LINKS } from './data';

const SOCIAL = [
  { icon: FaXTwitter, label: 'Twitter', href: '#' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  { icon: FaGithub, label: 'GitHub', href: '#' },
];

const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-2 text-lg font-semibold text-zinc-900"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                T
              </span>
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
              Modern issue tracking for support, engineering, and operations teams.
              Built for speed, clarity, and scale.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                {group}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineGlobeAlt className="h-4 w-4" />
              trackflow.app
            </span>
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineEnvelope className="h-4 w-4" />
              hello@trackflow.app
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
