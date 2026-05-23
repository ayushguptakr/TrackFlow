const inputStyles =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-base placeholder:text-zinc-400 focus:outline-none focus-visible:ring-4';

const Input = ({
  id,
  label,
  type = 'text',
  error,
  className = '',
  ...props
}) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      className={`${inputStyles} ${
        error
          ? 'border-red-300 focus:border-red-400 focus-visible:ring-red-100'
          : 'border-zinc-200 hover:border-zinc-300 focus:border-indigo-500 focus-visible:ring-indigo-100/80'
      }`}
      {...props}
    />
    {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
  </div>
);

export default Input;
