import Skeleton from '../ui/Skeleton';

const TicketTableSkeleton = ({ rows = 8 }) => (
  <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[var(--shadow-card)]">
    <div className="border-b border-zinc-100 bg-zinc-50/80 px-4 py-3.5">
      <Skeleton className="h-3 w-48" />
    </div>
    <div className="divide-y divide-zinc-50">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export default TicketTableSkeleton;
