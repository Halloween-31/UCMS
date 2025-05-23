import React, { useState, useEffect, useRef, type ReactNode } from 'react';

// --- Type Definitions ---

interface Site {
    id: number;
    title: string;
    domain: string;
    status: "Published" | "Draft" | "Review" | string; // Allow other strings for flexibility
    lastUpdated: string;
    imageUrl: string | null;
    imageAlt: string;
}

interface IconProps {
    classes: string;
    title?: string;
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'neutral';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

interface NavbarProps {
    onMobileMenuToggle: () => void;
    onUserMenuToggle: (explicitState?: boolean) => void;
    isUserMenuOpen: boolean;
    isMobileMenuOpen: boolean; // Added to control icon display
}

interface MobileMenuProps {
    isOpen: boolean;
}

interface SiteCardProps {
    site: Site;
}

// --- Icon Component ---
const Icon: React.FC<IconProps> = ({ classes, title }) => <i className={classes} title={title}></i>;

// --- Data ---
const initialSitesData: Site[] = [
    {
        id: 1,
        title: "My Travel Blog",
        domain: "www.mytravelblogcms.com",
        status: "Published",
        lastUpdated: "May 20, 2025",
        imageUrl: "https://placehold.co/600x400/A5B4FC/3730A3?text=My+Travel+Blog",
        imageAlt: "Site Screenshot - My Travel Blog"
    },
    {
        id: 2,
        title: "Online Store Project",
        domain: "shop.mystore-dev.cms",
        status: "Draft",
        lastUpdated: "Created: May 15, 2025",
        imageUrl: "https://placehold.co/600x400/FCA5A5/7F1D1D?text=Online+Store",
        imageAlt: "Site Screenshot - Online Store"
    },
    {
        id: 3,
        title: "Client Project Alpha",
        domain: "client-alpha.preview.site",
        status: "Review",
        lastUpdated: "May 18, 2025",
        imageUrl: null,
        imageAlt: "Client Project Alpha - No Preview"
    },
    {
        id: 4,
        title: "Portfolio Showcase",
        domain: "jane.design.portfolio",
        status: "Published",
        lastUpdated: "May 21, 2025",
        imageUrl: "https://placehold.co/600x400/86EFAC/166534?text=Portfolio",
        imageAlt: "Site Screenshot - Portfolio Showcase"
    },
];

// --- Helper Components ---

// Generic Button Component
const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', size = 'medium', className = '', ...props }) => {
    const baseStyle = "inline-flex items-center justify-center rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";
    const variants: Record<ButtonVariant, string> = {
        primary: "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
        secondary: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500",
        danger: "text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500",
        neutral: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
    };
    const sizes: Record<ButtonSize, string> = {
        small: "px-3 py-1.5 text-xs",
        medium: "px-5 py-2.5 text-sm",
        large: "px-6 py-3 text-base"
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};


// --- Main Components ---

// Navbar Component
const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle, onUserMenuToggle, isUserMenuOpen, isMobileMenuOpen }) => {
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                if (isUserMenuOpen) {
                    onUserMenuToggle(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isUserMenuOpen, onUserMenuToggle]);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Icon classes="fas fa-shield-alt fa-2x text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-indigo-700">UCMS</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">My Sites</a>
                                <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
                                <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Settings</a>
                                <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Help</a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button type="button" className="p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500">
                                <span className="sr-only">View notifications</span>
                                <Icon classes="far fa-bell fa-lg" />
                            </button>
                            <div className="ml-3 relative" ref={userMenuRef}>
                                <div>
                                    <button
                                        type="button"
                                        className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500"
                                        id="user-menu-button"
                                        aria-expanded={isUserMenuOpen}
                                        aria-haspopup="true"
                                        onClick={() => onUserMenuToggle()}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full object-cover" src="https://placehold.co/32x32/E0E7FF/4F46E5?text=U" alt="User Avatar" />
                                    </button>
                                </div>
                                {isUserMenuOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex={-1}
                                    >
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>Your Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>Settings</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>Sign out</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            onClick={() => onMobileMenuToggle()}
                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Icon classes={isMobileMenuOpen ? "fas fa-times fa-lg" : "fas fa-bars fa-lg"} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// MobileMenu Component
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#" className="bg-indigo-100 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">My Sites</a>
                <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Analytics</a>
                <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Settings</a>
                <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Help</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src="https://placehold.co/40x40/E0E7FF/4F46E5?text=U" alt="User Avatar" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">User Name</div>
                        <div className="text-sm font-medium text-gray-500">user@example.com</div>
                    </div>
                    <button type="button" className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500">
                        <span className="sr-only">View notifications</span>
                        <Icon classes="far fa-bell fa-lg" />
                    </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Your Profile</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Sign out</a>
                </div>
            </div>
        </div>
    );
};

// PageHeader Component
const PageHeader: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <h1 className="text-3xl font-bold text-gray-900">
                    Your Websites
                </h1>
                <Button variant="primary" size="medium">
                    <Icon classes="fas fa-plus mr-2" /> Create New Site
                </Button>
            </div>
        </header>
    );
};

// SiteCard Component
const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'published': return 'text-green-800 bg-green-100';
            case 'draft': return 'text-yellow-800 bg-yellow-100';
            case 'review': return 'text-blue-800 bg-blue-100';
            default: return 'text-gray-800 bg-gray-100';
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
        e.currentTarget.src = "https://placehold.co/600x400/E0E7FF/4F46E5?text=Error";
    };

    return (
        <div className="bg-white overflow-hidden shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col">
            {site.imageUrl ? (
                <img
                    className="h-48 w-full object-cover"
                    src={site.imageUrl}
                    alt={site.imageAlt}
                    onError={handleImageError}
                />
            ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center rounded-t-xl">
                    <Icon classes="fas fa-photo-video fa-4x text-gray-400" />
                </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate" title={site.title}>{site.title}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(site.status)}`}>
                        {site.status}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-1 truncate" title={site.domain}>{site.domain}</p>
                <p className="text-gray-500 text-xs mb-4">{site.lastUpdated}</p>
                <div className="mt-auto grid grid-cols-3 gap-2">
                    <Button variant="secondary" size="small" className="w-full" title="Edit Site">
                        <Icon classes="fas fa-pencil-alt" /> <span className="hidden sm:inline ml-1">Edit</span>
                    </Button>
                    <Button variant="neutral" size="small" className="w-full" title={site.status === 'Draft' ? "Preview Site" : "View Site"}>
                        <Icon classes="fas fa-eye" /> <span className="hidden sm:inline ml-1">{site.status === 'Draft' ? "Prev" : "View"}</span>
                    </Button>
                    <Button variant="danger" size="small" className="w-full" title="Delete Site">
                        <Icon classes="fas fa-trash-alt" /> <span className="hidden sm:inline ml-1">Del</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

// AddNewSiteCard Component
const AddNewSiteCard: React.FC = () => {
    return (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition-colors duration-300 ease-in-out flex items-center justify-center min-h-[280px] sm:min-h-[320px] cursor-pointer group">
            <div className="text-center p-6">
                <Icon classes="fas fa-plus-circle fa-3x text-gray-400 group-hover:text-indigo-500 transition-colors duration-150" />
                <p className="mt-2 text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors duration-150">Create a New Site</p>
            </div>
        </div>
    );
};

// Footer Component
const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} MyCMS. All Rights Reserved. Built with <Icon classes="fas fa-heart text-red-500" />.</p>
            </div>
        </footer>
    );
};

// Main App Component
const Sites: React.FC = () => {
    const [sites, _] = useState<Site[]>(initialSitesData);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
    
    const mobileMenuContainerRef = useRef<HTMLDivElement>(null); // Ref for the mobile menu itself
    const navbarRef = useRef<HTMLElement>(null); // Ref for the Navbar component to help with click outside

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const toggleUserMenu = (explicitState?: boolean) => {
        setIsUserMenuOpen(prev => typeof explicitState === 'boolean' ? explicitState : !prev);
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileMenuOpen) {
                const targetNode = event.target as Node;
                // Check if the click is outside the navbar (which contains the toggle button) 
                // AND outside the mobile menu container itself
                if (navbarRef.current && !navbarRef.current.contains(targetNode) &&
                    mobileMenuContainerRef.current && !mobileMenuContainerRef.current.contains(targetNode)) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // The direct DOM manipulation for the icon in the mobile menu button has been moved
    // into the Navbar component, which now receives `isMobileMenuOpen` as a prop.

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Assign ref to Navbar to help with click-outside detection for mobile menu */}
            <header ref={navbarRef}>
                <Navbar
                    onMobileMenuToggle={toggleMobileMenu}
                    onUserMenuToggle={toggleUserMenu}
                    isUserMenuOpen={isUserMenuOpen}
                    isMobileMenuOpen={isMobileMenuOpen} // Pass this to Navbar
                />
            </header>
            
            {/* Assign ref to the MobileMenu's wrapper div */}
            <div ref={mobileMenuContainerRef}>
                <MobileMenu isOpen={isMobileMenuOpen} />
            </div>
            
            <PageHeader />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                    {sites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sites.map(site => (
                                <SiteCard key={site.id} site={site} />
                            ))}
                            <AddNewSiteCard />
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Icon classes="fas fa-cloud-upload-alt fa-5x text-gray-300 mb-6" />
                            <h2 className="text-2xl font-semibold text-gray-700 mb-3">No Websites Found</h2>
                            <p className="text-gray-500 mb-8">It looks like you haven't created any sites yet. Let's get started!</p>
                            <Button variant="primary" size="large">
                                <Icon classes="fas fa-plus mr-2" /> Create Your First Site
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Sites;

// To make this runnable, you would typically have an index.tsx like this:
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; // Assuming Tailwind is set up here
// import App from './App';

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }


// And an index.html with <div id="root"></div>
// And Tailwind CSS configured in your project.
// For Font Awesome, ensure you have it linked in your main HTML file or install a React Font Awesome library.
// Example for index.html head:
// <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
// <style>
//   body { font-family: 'Inter', sans-serif; }
//   ::-webkit-scrollbar { width: 8px; height: 8px; }
//   ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
//   ::-webkit-scrollbar-thumb { background: #c4c4c4; border-radius: 10px; }
//   ::-webkit-scrollbar-thumb:hover { background: #a1a1a1; }
// </style>
