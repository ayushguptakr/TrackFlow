import { Link } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../../utils/constants';

const Logo = ({ onClick }) => (
  <Link
    to={ROUTES.HOME}
    onClick={onClick}
    className="flex items-center gap-2.5 rounded-lg outline-none transition-base focus-visible:ring-2 focus-visible:ring-indigo-500"
  >
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white shadow-sm">
      TF
    </div>
    <span className="text-base font-semibold tracking-tight text-zinc-900">{APP_NAME}</span>
  </Link>
);

export default Logo;
