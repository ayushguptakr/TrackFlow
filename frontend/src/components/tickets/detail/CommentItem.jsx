import Avatar from '../../ui/Avatar';
import { formatDateTime, formatRelativeTime } from '../../../utils/formatDate';

const CommentItem = ({ comment }) => (
  <li className="flex gap-3">
    <Avatar name={comment.author?.name} size="sm" />
    <div className="min-w-0 flex-1 rounded-lg border border-slate-100 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-slate-900">{comment.author?.name}</p>
          <p className="text-xs capitalize text-slate-400">{comment.author?.role}</p>
        </div>
        <time className="text-xs text-slate-400" title={formatDateTime(comment.createdAt)}>
          {formatRelativeTime(comment.createdAt)}
        </time>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
        {comment.text}
      </p>
    </div>
  </li>
);

export default CommentItem;
