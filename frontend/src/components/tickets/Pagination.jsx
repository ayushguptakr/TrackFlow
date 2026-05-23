const Pagination = ({ page, totalPages, total, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i += 1) pages.push(i);

  const btnBase =
    'rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition-base hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]';

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-[var(--shadow-card)] sm:flex-row sm:px-5">
      <p className="text-sm text-zinc-500">
        Page <span className="font-medium tabular-nums text-zinc-900">{page}</span> of{' '}
        <span className="font-medium tabular-nums text-zinc-900">{totalPages}</span>
        {total !== undefined && (
          <span className="text-zinc-400"> · {total} total</span>
        )}
      </p>
      <div className="flex items-center gap-1.5">
        <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={btnBase}>
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-9 rounded-lg px-3 py-1.5 text-sm font-medium transition-base active:scale-[0.98] ${
              p === page
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={btnBase}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
