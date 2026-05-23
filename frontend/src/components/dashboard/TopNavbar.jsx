import { Icons } from './icons';

const TopNavbar = ({ title, onMenuClick }) => (
  <header className="sticky top-0 z-30 flex h-[60px] items-center gap-4 border-b border-zinc-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
    <button
      type="button"
      onClick={onMenuClick}
      className="rounded-lg p-2 text-zinc-600 transition-base hover:bg-zinc-100 lg:hidden"
      aria-label="Open menu"
    >
      <Icons.menu className="h-5 w-5" />
    </button>

    <div className="min-w-0 flex-1">
      <h1 className="truncate text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
        {title}
      </h1>
    </div>
  </header>
);

export default TopNavbar;
