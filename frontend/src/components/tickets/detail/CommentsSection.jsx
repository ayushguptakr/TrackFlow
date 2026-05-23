import Card, { CardHeader } from '../../ui/Card';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentsSection = ({
  comments,
  commentCount,
  loading,
  commentText,
  onCommentChange,
  onSubmit,
  submitting,
  canComment,
}) => (
  <Card>
    <CardHeader
      title={`Comments (${commentCount ?? comments.length})`}
      description="Discussion and updates on this ticket"
    />

    {loading ? (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    ) : comments.length === 0 ? (
      <div className="rounded-lg border border-dashed border-slate-200 py-8 text-center">
        <p className="text-sm font-medium text-slate-600">No comments yet</p>
        <p className="mt-1 text-xs text-slate-400">Start the conversation below.</p>
      </div>
    ) : (
      <ul className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    )}

    {canComment && (
      <CommentForm
        value={commentText}
        onChange={onCommentChange}
        onSubmit={onSubmit}
        loading={submitting}
      />
    )}
  </Card>
);

export default CommentsSection;
