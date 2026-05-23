const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

const Avatar = ({ name, size = 'md', className = '' }) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 ring-1 ring-zinc-200/80 ${sizes[size]} ${className}`}
    aria-hidden
  >
    {getInitials(name)}
  </div>
);

export default Avatar;
