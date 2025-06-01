import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { Icon } from "../site/Site";

const GlobalHeader: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
      return <Navigate to="/" replace />;
  }
  const siteId = searchParams.get("siteId");

  const activeClassNames = `bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium" aria-current="page`;
  const normalClassNames = `text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`;

  const location = useLocation();

  return(
    <header className="bg-white shadow-md h-16 flex items-center px-6 flex-shrink-0 z-10">
      <div className="flex items-center">
        <Icon iconClass="fas fa-shield-alt fa-2x" className="text-indigo-600" />
        <span className="ml-3 text-xl font-bold text-indigo-700">UCMS</span>
      </div>
      <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
              <a href={`/site?userId=${userId}&siteId=${siteId}`} className={location.pathname === '/site' ? activeClassNames : normalClassNames}>My Sites</a>
              <a href={`/settings?userId=${userId}&siteId=${siteId}`} className={location.pathname === '/settings' ? activeClassNames : normalClassNames}>Settings</a>
          </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <span className="text-sm text-gray-600">user@example.com</span>
        <img className="h-8 w-8 rounded-full object-cover" src="https://placehold.co/32x32/E0E7FF/4F46E5?text=U" alt="User Avatar" />
        <button title="Logout" className="text-gray-500 hover:text-indigo-600">
          <Icon iconClass="fas fa-sign-out-alt fa-lg" />
        </button>
      </div>
    </header>
  )
};

export default GlobalHeader;