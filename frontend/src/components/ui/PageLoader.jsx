import Spinner from './Spinner';

const PageLoader = ({ message = 'Loading...' }) => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
    <Spinner size="lg" />
    <p className="text-sm font-medium text-zinc-500">{message}</p>
  </div>
);

export default PageLoader;
