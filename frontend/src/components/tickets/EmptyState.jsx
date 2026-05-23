import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, actionLabel, actionTo }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-20 text-center shadow-[var(--shadow-card)]">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/80">
      <svg className="h-7 w-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2M9 5v0"
        />
      </svg>
    </div>
    <h3 className="text-base font-semibold tracking-tight text-zinc-900">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">{description}</p>
    {actionLabel && actionTo && (
      <Link
        to={actionTo}
        className="mt-8 inline-flex items-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-base hover:bg-zinc-800 active:scale-[0.98]"
      >
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;
