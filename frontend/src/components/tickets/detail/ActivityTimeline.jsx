import Avatar from '../../ui/Avatar';
import Card, { CardHeader } from '../../ui/Card';
import { formatDateTime } from '../../../utils/formatDate';

const icons = {
  created: (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </span>
  ),
  comment: (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </span>
  ),
  updated: (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </span>
  ),
};

const ActivityTimelineItem = ({ event, isLast }) => (
  <li className="relative flex gap-4 pb-8">
    {!isLast && (
      <span
        className="absolute left-4 top-10 -ml-px h-full w-0.5 bg-slate-200"
        aria-hidden
      />
    )}
    <div className="relative z-10 shrink-0">{icons[event.type] || icons.updated}</div>
    <div className="min-w-0 flex-1 pt-0.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-900">{event.title}</p>
        <time className="text-xs text-slate-400" title={formatDateTime(event.date)}>
          {formatDateTime(event.date)}
        </time>
      </div>
      {event.user && (
        <div className="mt-1 flex items-center gap-2">
          <Avatar name={event.user.name} size="sm" />
          <span className="text-xs text-slate-500">{event.user.name}</span>
        </div>
      )}
      <p
        className={`mt-2 text-sm text-slate-600 ${
          event.type === 'comment' ? 'whitespace-pre-wrap' : ''
        }`}
      >
        {event.description}
      </p>
    </div>
  </li>
);

const ActivityTimeline = ({ events, loading }) => (
  <Card>
    <CardHeader title="Activity" description="Timeline of ticket events" />
    {loading ? (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    ) : events.length === 0 ? (
      <p className="text-sm text-slate-500">No activity recorded yet.</p>
    ) : (
      <ol className="mt-2">
        {events.map((event, index) => (
          <ActivityTimelineItem
            key={event.id}
            event={event}
            isLast={index === events.length - 1}
          />
        ))}
      </ol>
    )}
  </Card>
);

export default ActivityTimeline;
