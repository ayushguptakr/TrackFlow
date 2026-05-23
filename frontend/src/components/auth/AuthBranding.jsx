import { APP_NAME } from '../../utils/constants';

const features = [
  {
    title: 'Unified issue tracking',
    description: 'Manage bugs, tasks, and requests in one streamlined workspace.',
  },
  {
    title: 'Role-based workflows',
    description: 'Admins, support agents, and users each get the right view.',
  },
  {
    title: 'Built for teams',
    description: 'Inspired by the clarity of Linear, Notion, and Jira.',
  },
];

const AuthBranding = () => {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white lg:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-violet-500/15" />

      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
            TF
          </div>
          <span className="text-lg font-semibold tracking-tight">{APP_NAME}</span>
        </div>
        <p className="mt-1 text-sm text-slate-400">Issue tracking for modern teams</p>
      </div>

      <div className="relative z-10 my-10 space-y-6">
        <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight lg:text-4xl">
          Ship faster with clarity across every issue.
        </h2>
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <div>
                <p className="text-sm font-medium text-slate-100">{feature.title}</p>
                <p className="mt-0.5 text-sm text-slate-400">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </div>
  );
};

export default AuthBranding;
