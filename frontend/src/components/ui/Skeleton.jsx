const Skeleton = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'animate-shimmer rounded-md bg-zinc-200/60',
    pulse: 'animate-pulse rounded-md bg-zinc-200/80',
  };

  return <div className={`${variants[variant]} ${className}`} aria-hidden />;
};

const textWidths = ['w-full', 'w-full', 'w-full', 'w-4/5', 'w-3/5'];

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2.5 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-3.5 ${textWidths[i] || 'w-2/3'}`} />
    ))}
  </div>
);

export const SkeletonAvatar = ({ size = 'md' }) => {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' };
  return <Skeleton className={`rounded-full ${sizes[size]}`} />;
};

export default Skeleton;
