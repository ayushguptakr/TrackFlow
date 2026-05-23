import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { getDashboardPath } from '../utils/roleRedirect';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-surface)] px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-zinc-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to={ROUTES.HOME}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-base hover:bg-zinc-50"
        >
          Go home
        </Link>
        {isAuthenticated && (
          <Link
            to={getDashboardPath()}
            className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-base hover:bg-zinc-800"
          >
            Back to dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
