import { Outlet } from 'react-router-dom';
import AuthBranding from '../components/auth/AuthBranding';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:block">
          <AuthBranding />
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
