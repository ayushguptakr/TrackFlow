import Spinner from './Spinner';

const variants = {
  primary:
    'bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 focus-visible:ring-zinc-300 disabled:bg-zinc-400',
  secondary:
    'border border-zinc-200 bg-white text-zinc-700 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 focus-visible:ring-zinc-200',
  ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-200',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-200 disabled:bg-red-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-5 py-3 text-sm rounded-xl',
};

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    className={`inline-flex w-full items-center justify-center gap-2 font-medium transition-base focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {loading ? <Spinner size="sm" className={variant === 'primary' || variant === 'danger' ? 'border-white/30 border-t-white' : ''} /> : null}
    {children}
  </button>
);

export default Button;
