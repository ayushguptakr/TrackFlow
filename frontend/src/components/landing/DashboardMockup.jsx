const STATUS_STYLES = {
  Open: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const TICKETS = [
  { id: 'TF-1042', title: 'Payment webhook timeout', status: 'In Progress', priority: 'High' },
  { id: 'TF-1041', title: 'Dashboard export fails on Safari', status: 'Open', priority: 'Medium' },
  { id: 'TF-1039', title: 'SSO redirect loop for enterprise', status: 'Resolved', priority: 'Critical' },
  { id: 'TF-1037', title: 'Email notifications delayed', status: 'In Progress', priority: 'Low' },
];

const PRIORITY_STYLES = {
  Critical: 'text-red-600',
  High: 'text-orange-600',
  Medium: 'text-zinc-600',
  Low: 'text-zinc-400',
};

const DashboardMockup = ({ compact = false }) => (
  <div
    className={`relative z-10 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm ${
      compact ? '' : 'shadow-md'
    }`}
  >
    <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <span className="text-xs font-medium text-zinc-500">trackflow.app/dashboard</span>
    </div>

    <div className={`grid gap-3 p-4 ${compact ? '' : 'sm:grid-cols-3'}`}>
      {[
        { label: 'Open tickets', value: '47', change: '+12%' },
        { label: 'Resolved today', value: '18', change: '+5%' },
        { label: 'Avg. response', value: '2.4h', change: '-18%' },
      ].map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-3"
        >
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            {card.label}
          </p>
          <p className="mt-1 text-xl font-semibold text-zinc-900">{card.value}</p>
          <p className="mt-0.5 text-xs font-medium text-emerald-600">{card.change}</p>
        </div>
      ))}
    </div>

    {!compact && (
      <div className="border-t border-zinc-100 px-4 pb-4">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-zinc-500">Weekly volume</p>
            <div className="mt-2 flex h-20 items-end gap-1.5">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-5 shrink-0 rounded-md bg-indigo-500"
                  style={{ height: `${Math.round((h / 100) * 80)}px` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center">
            <p className="text-[10px] font-medium uppercase text-zinc-500">Resolution</p>
            <p className="text-2xl font-semibold text-indigo-600">94%</p>
          </div>
        </div>
      </div>
    )}

    <div className="border-t border-zinc-100">
      <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-zinc-100 bg-zinc-50/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        <span>Ticket</span>
        <span>Status</span>
        <span>Priority</span>
      </div>
      {TICKETS.slice(0, compact ? 3 : 4).map((ticket) => (
        <div
          key={ticket.id}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-zinc-50 px-4 py-2.5 last:border-0"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-zinc-900">{ticket.title}</p>
            <p className="text-[10px] text-zinc-500">{ticket.id}</p>
          </div>
          <span
            className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${
              STATUS_STYLES[ticket.status]
            }`}
          >
            {ticket.status}
          </span>
          <span className={`text-[10px] font-semibold ${PRIORITY_STYLES[ticket.priority]}`}>
            {ticket.priority}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default DashboardMockup;
