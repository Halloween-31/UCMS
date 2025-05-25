import { Icon } from "../site/Site";

type PageLink = {
  id: number;
  name: string;
  icon: string;
}

type MediaLink = {
  id: number;
  name: string;
  icon: string;
  type: 'image' | 'video'; // Example types
}

type SettingsLikn = {
    id: number;
    name: string;
    icon: string;
}

type SidebarProps = {
  pages: PageLink[];
  mediaItems: MediaLink[];
  settingItems: SettingsLikn[];
  activePageId: number;
  onSelectPage: (pageId: number) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
};
const Sidebar: React.FC<SidebarProps> = ({ pages, mediaItems, settingItems, activePageId, onSelectPage, selectedLanguage, onLanguageChange }) => {
    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2 flex-shrink-0 overflow-y-auto">
            <div className="mb-4">
                <label htmlFor="language-select" className="block text-xs font-medium text-gray-500 mb-1">Language</label>
                <select
                    id="language-select"
                    value={selectedLanguage}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="en-US">English (USA)</option>
                    <option value="es-ES">Spanish (ES)</option>
                    <option value="fr-FR">French (FR)</option>
                </select>
            </div>
            
            {pages && pages.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pages</h3>
                    <nav className="space-y-1">
                        {pages.map(page => (
                            <a
                                key={page.id}
                                href="#"
                                onClick={(e) => { e.preventDefault(); onSelectPage(page.id); }}
                                className={`sidebar-link group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 ${activePageId === page.id ? 'active' : ''}`}
                            >
                                <Icon iconClass={page.icon} className="mr-3 text-gray-500 group-hover:text-gray-700 w-5 text-center" />
                                {page.name}
                            </a>
                        ))}
                        <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 mt-4">
                            <Icon iconClass="fas fa-plus-circle" className="mr-3 w-5 text-center" />
                            Add New Page
                        </a>
                    </nav>
                </div>
            )}

            {mediaItems && mediaItems.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Media Library</h3>
                    <nav className="space-y-1">
                        {mediaItems.map(item => (
                            <a key={item.id} href="#" onClick={(e) => e.preventDefault()} className="sidebar-link group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200">
                                <Icon iconClass={item.icon} className="mr-3 text-gray-500 group-hover:text-gray-700 w-5 text-center" />
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}

            {settingItems && settingItems.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</h3>
                    <nav className="space-y-1">
                        {settingItems.map(setting => (
                            <a
                                key={setting.id}
                                href="#"
                                onClick={(e) => { e.preventDefault(); onSelectPage(setting.id); }}
                                className={`sidebar-link group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200`}
                            >
                                <Icon iconClass={setting.icon} className="mr-3 text-gray-500 group-hover:text-gray-700 w-5 text-center" />
                                {setting.name}
                            </a>
                        ))}
                        <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 mt-4">
                            <Icon iconClass="fas fa-plus-circle" className="mr-3 w-5 text-center" />
                            Add New Setting
                        </a>
                    </nav>
                </div>
            )}
        </aside>
)};

export default Sidebar;