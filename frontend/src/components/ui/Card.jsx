const Card = ({ children, className = '', padding = true, hover = false }) => (
  <div
    className={`rounded-xl border border-zinc-200/80 bg-white ${hover ? 'card-interactive' : 'shadow-[var(--shadow-card)]'} ${
      padding ? 'p-6' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ title, description, action }) => (
  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h3 className="text-sm font-semibold tracking-tight text-zinc-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-zinc-500">{description}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default Card;
