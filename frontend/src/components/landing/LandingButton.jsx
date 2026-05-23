import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md',
  secondary:
    'border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md',
  dark: 'bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 hover:shadow-md',
};

const LandingButton = ({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  onClick,
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
};

export default LandingButton;
