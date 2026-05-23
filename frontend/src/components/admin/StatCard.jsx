const accents = {
  indigo: 'bg-indigo-50 text-indigo-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-800',
  violet: 'bg-violet-50 text-violet-700',
  slate: 'bg-zinc-100 text-zinc-600',
};

const StatCard = ({ label, value, hint, accent = 'indigo' }) => (
  <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-[var(--shadow-card)] transition-base hover:shadow-[var(--shadow-card-hover)] sm:p-6">
    <p className="text-sm font-medium text-zinc-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-zinc-900 sm:text-3xl">
      {value}
    </p>
    {hint && (
      <span
        className={`mt-3 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${accents[accent]}`}
      >
        {hint}
      </span>
    )}
  </div>
);

export default StatCard;
