import Card from '../../ui/Card';
import Skeleton from '../../ui/Skeleton';

const TicketDetailSkeleton = () => (
  <div className="space-y-6 sm:space-y-8">
    <Skeleton className="h-4 w-28" />
    <div className="space-y-3">
      <Skeleton className="h-8 w-2/3 max-w-md" />
      <Skeleton className="h-4 w-48" />
    </div>
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <Card>
          <Skeleton className="mb-4 h-4 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </Card>
        <Card>
          <Skeleton className="mb-4 h-4 w-20" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <Skeleton className="h-16 flex-1 rounded-lg" />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="p-5">
          <Skeleton className="mb-4 h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="mt-3 h-10 w-full rounded-lg" />
        </Card>
      </div>
    </div>
  </div>
);

export default TicketDetailSkeleton;
