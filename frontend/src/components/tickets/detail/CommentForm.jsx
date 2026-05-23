import Button from '../../ui/Button';

const CommentForm = ({ value, onChange, onSubmit, loading, disabled }) => (
  <form onSubmit={onSubmit} className="border-t border-slate-100 pt-6">
    <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-slate-700">
      Add a comment
    </label>
    <textarea
      id="comment"
      rows={3}
      placeholder="Write an update or reply..."
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
    />
    <div className="mt-3 flex justify-end">
      <Button type="submit" loading={loading} disabled={disabled || !value.trim()} className="!w-auto px-5">
        Post comment
      </Button>
    </div>
  </form>
);

export default CommentForm;
