const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[2.5px]',
};

const Spinner = ({ size = 'md', className = '' }) => (
  <span
    className={`inline-block animate-spin rounded-full border-zinc-200 border-t-indigo-600 ${sizes[size]} ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
