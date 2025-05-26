import React, { useState, useEffect, /*useRef,*/ type ChangeEvent } from 'react';

// --- TypeScript Interfaces ---

interface PageLink {
  id: string;
  name: string;
  icon: string;
}

interface MediaLink {
  id: string;
  name: string;
  icon: string;
  type: 'image' | 'video';
}

interface ContentData {
  headerTitle: string;
  mainHeadline: string;
  subtitle: string;
  bodyText: string;
  ctaButton: string;
  currentImageUrl: string | null;
}

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
}

interface PageCodeData {
  html: string;
  css: string;
}

interface SettingsData {
  pageSlug: string;
  seoTitle: string;
  seoDescription: string;
  publishStatus: boolean;
  advancedFields: Array<{
    id: string;
    label: string;
    description: string;
    typeValue: string;
  }>;
}

interface PageData {
  id: string;
  title: string;
  description: string;
  content: ContentData;
  media: MediaAsset[];
  settings: SettingsData;
  code: PageCodeData;
}

type ActiveTab = 'content' | 'media' | 'settings';
type EditorView = 'visual' | 'code';
type ActiveCodeEditorTab = 'html' | 'css';


// --- Initial Data (Placeholders) ---
const initialPages: PageLink[] = [
  { id: 'home', name: 'Home', icon: 'fas fa-home' },
  { id: 'about', name: 'About', icon: 'fas fa-info-circle' },
  { id: 'services', name: 'Services', icon: 'fas fa-concierge-bell' },
  { id: 'contact', name: 'Contact', icon: 'fas fa-envelope' },
];

const initialMediaLinks: MediaLink[] = [
  { id: 'logo', name: 'Logo.png', icon: 'fas fa-image', type: 'image' },
  { id: 'heroVideo', name: 'HeroVideo.mp4', icon: 'fas fa-video', type: 'video' },
];

const placeholderHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to Best CMS Ever</h1>
    </header>
    <main>
        <h2>Main headline of page</h2>
        <p>You can achieve any goals and ideas using this powerful CMS!</p>
        <img src="https://placehold.co/600x300/E0E7FF/4F46E5?text=Page+Image" alt="Placeholder Image">
        <a href="#" class="cta-button">Learn More</a>
    </main>
    <footer>
        <p>&copy; ${new Date().getFullYear()} MyCMS</p>
    </footer>
</body>
</html>
`;

const placeholderCSS = `
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
}
header {
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
    text-align: center;
}
main {
    padding: 1rem;
    text-align: center;
}
main img {
    max-width: 100%;
    height: auto;
    margin-top: 1rem;
    border-radius: 8px;
}
.cta-button {
    display: inline-block;
    background-color: #4f46e5; /* Indigo */
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
}
.cta-button:hover {
    background-color: #3730a3; /* Darker Indigo */
}
footer {
    text-align: center;
    padding: 1rem 0;
    background-color: #333;
    color: #fff;
    position: relative;
    bottom: 0;
    width: 100%;
}
`;

const initialPageData: Record<string, PageData> = {
  home: {
    id: 'home',
    title: 'Home',
    description: 'Editing the main landing page.',
    content: {
      headerTitle: 'Best CMS Ever',
      mainHeadline: 'Main headline of page',
      subtitle: 'You can achieve any goals and ideas using this powerful CMS!',
      bodyText: '<p>Rich text editor would be here...</p>',
      ctaButton: 'Learn More',
      currentImageUrl: 'https://placehold.co/600x300/E0E7FF/4F46E5?text=Current+Image',
    },
    media: [
      { id: 'media1', name: 'Image1.jpg', url: 'https://placehold.co/200x200/A5B4FC/3730A3?text=Image1.jpg', type: 'image' },
      { id: 'media2', name: 'PromoVideo.mp4', url: '', type: 'video' },
    ],
    settings: {
      pageSlug: 'home',
      seoTitle: 'Best CMS Ever - Home',
      seoDescription: 'Discover the best CMS for your projects. Easy to use and powerful.',
      publishStatus: true,
      advancedFields: [
        { id: 'advHeader', label: 'Header', description: 'Main headline of page', typeValue: 'textstring' },
        { id: 'advSubtitle', label: 'Subtitle', description: 'Below title', typeValue: 'textarea' },
      ],
    },
    code: { html: placeholderHTML, css: placeholderCSS }
  },
  about: {
    id: 'about',
    title: 'About Us',
    description: 'Editing the about us page.',
    content: { headerTitle: 'About Our Company', mainHeadline: 'Our Story', subtitle: 'Learn more about our journey.', bodyText: '<p>Details about the company...</p>', ctaButton: 'Meet the Team', currentImageUrl: 'https://placehold.co/600x300/A78BFA/5B21B6?text=About+Us' },
    media: [],
    settings: { pageSlug: 'about', seoTitle: 'About Us - MyCMS', seoDescription: 'Learn about MyCMS.', publishStatus: true, advancedFields: [] },
    code: { html: `<h1>About Us Page</h1>\n<p>Content specific to about page.</p>`, css: `h1 { color: purple; }` }
  },
};

// --- Styling ---
const globalStyles = `
  body { font-family: 'Inter', sans-serif; background-color: #f0f2f5; }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: #e0e0e0; border-radius: 10px; }
  ::-webkit-scrollbar-thumb { background: #a0a0a0; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #808080; }
  .tab-button.active { border-bottom-color: #4f46e5; color: #4f46e5; font-weight: 600; }
  .sidebar-link.active { background-color: #e0e7ff; color: #3730a3; font-weight: 600; }
  .form-input, .form-textarea, .code-textarea { border-color: #d1d5db; }
  .form-input:focus, .form-textarea:focus, .code-textarea:focus { border-color: #4f46e5; box-shadow: 0 0 0 1px #4f46e5; }
  .code-textarea { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; min-height: 400px; background-color: #1e1e1e; color: #d4d4d4; border-radius: 0.375rem; padding: 1rem; line-height: 1.5; white-space: pre; overflow: auto; }
`;

// --- Icon Component ---
interface IconProps { iconClass: string; className?: string; title?: string; }
const Icon: React.FC<IconProps> = ({ iconClass, className, title }) => <i className={`${iconClass} ${className || ''}`} title={title}></i>;

// --- Components ---
const GlobalHeader: React.FC = () => (
  <header className="bg-white shadow-md h-16 flex items-center px-6 flex-shrink-0 z-40"> {/* Increased z-index for header */}
    <div className="flex items-center">
      <Icon iconClass="fas fa-shield-alt fa-2x" className="text-indigo-600" />
      <span className="ml-3 text-xl font-bold text-indigo-700">MyCMS</span>
    </div>
    <div className="ml-auto flex items-center space-x-4">
      <span className="text-sm text-gray-600">user@example.com</span>
      <img className="h-8 w-8 rounded-full object-cover" src="https://placehold.co/32x32/E0E7FF/4F46E5?text=U" alt="User Avatar" />
      <button title="Logout" className="text-gray-500 hover:text-indigo-600"><Icon iconClass="fas fa-sign-out-alt fa-lg" /></button>
    </div>
  </header>
);

interface SidebarProps { pages: PageLink[]; mediaItems: MediaLink[]; activePageId: string; onSelectPage: (pageId: string) => void; selectedLanguage: string; onLanguageChange: (lang: string) => void; }
const Sidebar: React.FC<SidebarProps> = ({ pages, mediaItems, activePageId, onSelectPage, selectedLanguage, onLanguageChange }) => (
  <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2 flex-shrink-0 overflow-y-auto z-20"> {/* Ensure sidebar is above chat panel if it overlaps in extreme cases */}
    <div className="mb-4">
      <label htmlFor="language-select" className="block text-xs font-medium text-gray-500 mb-1">Language</label>
      <select id="language-select" value={selectedLanguage} onChange={(e) => onLanguageChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        <option value="en-US">English (USA)</option> <option value="es-ES">Spanish (ES)</option> <option value="fr-FR">French (FR)</option>
      </select>
    </div>
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pages</h3>
    <nav className="space-y-1">
      {pages.map(page => (<a key={page.id} href="#" onClick={(e) => { e.preventDefault(); onSelectPage(page.id); }} className={`sidebar-link group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 ${activePageId === page.id ? 'active' : ''}`}><Icon iconClass={page.icon} className="mr-3 text-gray-500 group-hover:text-gray-700 w-5 text-center" />{page.name}</a>))}
      <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 mt-4"><Icon iconClass="fas fa-plus-circle" className="mr-3 w-5 text-center" />Add New Page</a>
    </nav>
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Media Library</h3>
    <nav className="space-y-1">
      {mediaItems.map(item => (<a key={item.id} href="#" onClick={(e) => e.preventDefault()} className="sidebar-link group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200"><Icon iconClass={item.icon} className="mr-3 text-gray-500 group-hover:text-gray-700 w-5 text-center" />{item.name}</a>))}
    </nav>
  </aside>
);

interface PageEditorHeaderProps { pageTitle: string; pageDescription: string; onPageTitleChange: (newTitle: string) => void; onSave: () => void; currentEditorView: EditorView; onToggleEditorView: (view: EditorView) => void; }
const PageEditorHeader: React.FC<PageEditorHeaderProps> = ({ pageTitle, pageDescription, onPageTitleChange, onSave, currentEditorView, onToggleEditorView }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
    <div>
      <input type="text" value={pageTitle} onChange={(e) => onPageTitleChange(e.target.value)} className="text-2xl font-semibold text-gray-800 border-none p-0 focus:ring-0 focus:border-transparent w-auto inline-block bg-transparent" readOnly={currentEditorView === 'code'} />
      <p className="text-sm text-gray-500">{pageDescription}</p>
    </div>
    <div className="flex items-center space-x-2">
      <button onClick={() => onToggleEditorView('visual')} className={`px-3 py-1.5 text-sm font-medium rounded-md border flex items-center ${currentEditorView === 'visual' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'}`}><Icon iconClass="fas fa-palette" className="mr-2" /> Visual</button>
      <button onClick={() => onToggleEditorView('code')} className={`px-3 py-1.5 text-sm font-medium rounded-md border flex items-center ${currentEditorView === 'code' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'}`}><Icon iconClass="fas fa-code" className="mr-2" /> Code</button>
      <button onClick={onSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm flex items-center"><Icon iconClass="fas fa-save" className="mr-2" /> Save Page</button>
    </div>
  </div>
);

interface TabsProps { activeTab: ActiveTab; onTabChange: (tab: ActiveTab) => void; }
const TabsComponent: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ActiveTab; label: string }[] = [{ id: 'content', label: 'Content' }, { id: 'media', label: 'Media' }, { id: 'settings', label: 'Settings' }];
  return (<div className="mb-6"><div className="border-b border-gray-200"><nav className="-mb-px flex space-x-6" aria-label="Tabs">{tabs.map(tab => (<button key={tab.id} onClick={() => onTabChange(tab.id)} className={`tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-indigo-600 hover:border-indigo-500 ${activeTab === tab.id ? 'active' : ''}`}>{tab.label}</button>))} </nav></div></div>);
};

interface ContentPanelProps { data: ContentData; onDataChange: (field: keyof ContentData, value: string) => void; onFileChange: (event: ChangeEvent<HTMLInputElement>) => void; }
const ContentPanel: React.FC<ContentPanelProps> = ({ data, onDataChange, onFileChange }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg shadow"><h3 className="text-lg font-semibold text-gray-700 mb-1">Header Section</h3><p className="text-xs text-gray-500 mb-4">Main headline and branding for the page.</p><div className="space-y-4"><div><label htmlFor="header-title" className="block text-sm font-medium text-gray-700 mb-1">Page Title / Brand</label><input type="text" id="header-title" value={data.headerTitle} onChange={(e) => onDataChange('headerTitle', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" /></div></div></div>
    <div className="bg-gray-50 p-6 rounded-lg shadow"><h3 className="text-lg font-semibold text-gray-700 mb-1">Main Content</h3><p className="text-xs text-gray-500 mb-4">Primary content of the page.</p><div className="space-y-4"><div><label htmlFor="main-headline" className="block text-sm font-medium text-gray-700 mb-1">Main Headline</label><input type="text" id="main-headline" value={data.mainHeadline} onChange={(e) => onDataChange('mainHeadline', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" /></div><div><label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label><textarea id="subtitle" rows={3} value={data.subtitle} onChange={(e) => onDataChange('subtitle', e.target.value)} className="form-textarea w-full p-2 border rounded-md shadow-sm text-base"></textarea></div><div><label htmlFor="body-text" className="block text-sm font-medium text-gray-700 mb-1">Body Content (Rich Text)</label><div className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white min-h-[150px]"><div className="text-gray-400 p-4" dangerouslySetInnerHTML={{ __html: data.bodyText }}></div></div></div><div><label htmlFor="cta-button" className="block text-sm font-medium text-gray-700 mb-1">Call to Action Button Text</label><input type="text" id="cta-button" value={data.ctaButton} onChange={(e) => onDataChange('ctaButton', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" /></div></div></div>
    <div className="bg-gray-50 p-6 rounded-lg shadow"><h3 className="text-lg font-semibold text-gray-700 mb-1">Image Section</h3><p className="text-xs text-gray-500 mb-4">Featured image for this page.</p><div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><Icon iconClass="fas fa-image fa-3x" className="text-gray-400 mx-auto" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onFileChange} /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p></div></div>{data.currentImageUrl && (<div className="mt-4"><img src={data.currentImageUrl} alt="Current Page Image" className="rounded-md shadow-sm max-h-48 mx-auto" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://placehold.co/300x150/CCCCCC/999999?text=No+Image'; e.currentTarget.onerror = null; }} /></div>)}</div>
  </div>
);

interface MediaPanelProps { mediaAssets: MediaAsset[]; }
const MediaPanel: React.FC<MediaPanelProps> = ({ mediaAssets }) => (
  <div className="space-y-6"><div className="bg-gray-50 p-6 rounded-lg shadow"><h3 className="text-lg font-semibold text-gray-700 mb-4">Page Media Assets</h3><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">{mediaAssets.map(asset => (<div key={asset.id} className="group relative border border-gray-200 rounded-lg overflow-hidden">{asset.type === 'image' ? (<img src={asset.url} alt={asset.name} className="w-full h-32 object-cover" />) : (<div className="w-full h-32 bg-gray-200 flex items-center justify-center"><Icon iconClass="fas fa-file-video fa-3x" className="text-gray-400" /></div>)}<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center"><button className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 hover:bg-red-600 rounded-full text-xs" title="Delete"><Icon iconClass="fas fa-trash-alt" /></button></div><p className="text-xs text-gray-600 p-2 truncate">{asset.name}</p></div>))}{<div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-indigo-500"><div className="text-center"><Icon iconClass="fas fa-plus-circle text-2xl" className="text-gray-400" /><p className="text-xs text-gray-500 mt-1">Add Media</p></div></div>}</div></div></div>
);

interface SettingsPanelProps { data: SettingsData; onDataChange: (field: keyof SettingsData | `advancedFieldType-${string}`, value: string | boolean) => void; }
const SettingsPanel: React.FC<SettingsPanelProps> = ({ data, onDataChange }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg shadow"><h3 className="text-lg font-semibold text-gray-700 mb-1">Page Settings</h3><p className="text-xs text-gray-500 mb-4">Configure various options for this page.</p><div className="space-y-4"><div><label htmlFor="page-slug" className="block text-sm font-medium text-gray-700 mb-1">Page Slug (URL)</label><div className="flex rounded-md shadow-sm"><span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">yourdomain.com/</span><input type="text" id="page-slug" value={data.pageSlug} onChange={(e) => onDataChange('pageSlug', e.target.value)} className="form-input flex-1 block w-full rounded-none rounded-r-md p-2 border sm:text-sm" /></div></div><div><label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label><input type="text" id="seo-title" value={data.seoTitle} onChange={(e) => onDataChange('seoTitle', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm" /></div><div><label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 mb-1">SEO Meta Description</label><textarea id="seo-description" rows={3} value={data.seoDescription} onChange={(e) => onDataChange('seoDescription', e.target.value)} className="form-textarea w-full p-2 border rounded-md shadow-sm"></textarea></div><div className="flex items-center"><input id="publish-status" name="publish-status" type="checkbox" checked={data.publishStatus} onChange={(e) => onDataChange('publishStatus', e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" /><label htmlFor="publish-status" className="ml-2 block text-sm text-gray-900">Publish this page</label></div></div></div>
    <div className="bg-gray-50 p-6 rounded-lg shadow"><h3 className="text-lg font-semibold text-gray-700 mb-1">Advanced Settings</h3><p className="text-xs text-gray-500 mb-4">Define field types (mimicking your image).</p><div className="space-y-4">{data.advancedFields.map((field) => (<div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"><div><label className="block text-sm font-medium text-gray-700 mb-1">Field: {field.label}</label><p className="text-xs text-gray-500">{field.description}</p></div><div><label htmlFor={`type-${field.id}`} className="block text-xs font-medium text-gray-500 mb-1">Type</label><input type="text" id={`type-${field.id}`} value={field.typeValue} onChange={(e) => onDataChange(`advancedFieldType-${field.id}`, e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-sm" /></div></div>))}</div></div>
  </div>
);

interface CodeEditorViewProps { codeData: PageCodeData; onCodeChange: (type: keyof PageCodeData, newCode: string) => void; }
const CodeEditorView: React.FC<CodeEditorViewProps> = ({ codeData, onCodeChange }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<ActiveCodeEditorTab>('html');
  return (<div className="space-y-6"><div className="border-b border-gray-200"><nav className="-mb-px flex space-x-6" aria-label="Code Tabs"><button onClick={() => setActiveCodeTab('html')} className={`tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeCodeTab === 'html' ? 'active text-indigo-600 border-indigo-500' : 'text-gray-500 hover:text-indigo-600 hover:border-indigo-500'}`}>HTML</button><button onClick={() => setActiveCodeTab('css')} className={`tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeCodeTab === 'css' ? 'active text-indigo-600 border-indigo-500' : 'text-gray-500 hover:text-indigo-600 hover:border-indigo-500'}`}>CSS</button></nav></div>{activeCodeTab === 'html' && (<div><label htmlFor="html-code-editor" className="block text-sm font-medium text-gray-700 mb-2">HTML Code</label><textarea id="html-code-editor" value={codeData.html} onChange={(e) => onCodeChange('html', e.target.value)} className="code-textarea w-full" spellCheck="false" /></div>)}{activeCodeTab === 'css' && (<div><label htmlFor="css-code-editor" className="block text-sm font-medium text-gray-700 mb-2">CSS Code</label><textarea id="css-code-editor" value={codeData.css} onChange={(e) => onCodeChange('css', e.target.value)} className="code-textarea w-full" spellCheck="false" /></div>)}</div>);
};

// --- AI Chat Components ---
interface AiChatButtonProps { onToggleChat: () => void; }
const AiChatButton: React.FC<AiChatButtonProps> = ({ onToggleChat }) => (
  <button
    onClick={onToggleChat}
    className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    title="Open AI Chat"
  >
    <Icon iconClass="fas fa-comments fa-lg" />
  </button>
);

interface AiChatPanelProps { isOpen: boolean; onClose: () => void; }
const AiChatPanel: React.FC<AiChatPanelProps> = ({ isOpen, onClose }) => (
  <div
    className={`fixed top-16 bottom-0 right-0 bg-gray-100 border-l border-gray-300 shadow-xl z-50
                transform transition-transform duration-300 ease-in-out
                w-80 xl:w-96 p-4 flex flex-col
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
  >
    <div className="flex items-center justify-between mb-4 flex-shrink-0">
      <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <Icon iconClass="fas fa-times fa-lg" />
      </button>
    </div>
    <div className="flex-grow overflow-y-auto mb-4 bg-white p-3 rounded-md shadow">
      <p className="text-sm text-gray-500">AI Chat is ready. Ask me anything about this page!</p>
      <div className="mt-3 space-y-2 text-xs">
        <div className="p-2 bg-indigo-50 rounded-lg self-start max-w-[85%] break-words">How can I improve SEO for this page?</div>
        <div className="p-2 bg-gray-200 rounded-lg self-end text-right ml-auto max-w-[85%] break-words">You can start by optimizing your meta description and ensuring relevant keywords are used in the content.</div>
      </div>
    </div>
    <div className="mt-auto flex-shrink-0">
      <textarea
        className="form-textarea w-full p-2 border rounded-md shadow-sm text-sm"
        rows={3}
        placeholder="Type your message..."
      />
      <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium">
        Send
      </button>
    </div>
  </div>
);

// --- Main App Component ---
const TestPageAI: React.FC = () => {
  const [activePageId, setActivePageId] = useState<string>('home');
  const [currentPageData, setCurrentPageData] = useState<PageData>(initialPageData.home);
  const [activeVisualTab, setActiveVisualTab] = useState<ActiveTab>('content');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [editorView, setEditorView] = useState<EditorView>('visual');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // New state for AI Chat

  useEffect(() => {
    const pageDataToLoad = initialPageData[activePageId] || initialPageData.home;
    if (!pageDataToLoad.code) { pageDataToLoad.code = { html: placeholderHTML, css: placeholderCSS }; }
    setCurrentPageData(pageDataToLoad);
    setActiveVisualTab('content');
  }, [activePageId]);

  const handlePageSelect = (pageId: string) => setActivePageId(pageId);
  const handleLanguageChange = (lang: string) => { setSelectedLanguage(lang); console.log("Language changed to:", lang); };
  const handlePageTitleChange = (newTitle: string) => setCurrentPageData(prev => ({ ...prev, title: newTitle }));
  const handleSavePage = () => { console.log("Saving page:", activePageId, "Current View:", editorView, currentPageData); alert(`Page data (${editorView} view) saved to console!`); };
  const handleContentDataChange = (field: keyof ContentData, value: string) => setCurrentPageData(prev => ({ ...prev, content: { ...prev.content, [field]: value }}));
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => { if (event.target.files && event.target.files[0]) { const file = event.target.files[0]; const reader = new FileReader(); reader.onloadend = () => { setCurrentPageData(prev => ({ ...prev, content: { ...prev.content, currentImageUrl: reader.result as string }})); }; reader.readAsDataURL(file); console.log("Uploaded file:", file.name); }};
  const handleSettingsDataChange = (field: keyof SettingsData | `advancedFieldType-${string}`, value: string | boolean) => { setCurrentPageData(prev => { if (typeof field === 'string' && field.startsWith('advancedFieldType-')) { const fieldId = field.replace('advancedFieldType-', ''); return { ...prev, settings: { ...prev.settings, advancedFields: prev.settings.advancedFields.map(f => f.id === fieldId ? { ...f, typeValue: value as string } : f)}}; } return { ...prev, settings: { ...prev.settings, [field as keyof SettingsData]: value }}; }); };
  const handleCodeDataChange = (type: keyof PageCodeData, newCode: string) => setCurrentPageData(prev => ({ ...prev, code: { ...prev.code, [type]: newCode }}));
  const toggleEditorView = (view: EditorView) => setEditorView(view);
  const toggleChatPanel = () => setIsChatOpen(prev => !prev); // Toggle AI Chat panel

  return (
    <>
      <style>{globalStyles}</style>
      <div className="flex flex-col h-screen">
        <GlobalHeader />
        <div className="flex flex-1 overflow-hidden relative"> {/* Added relative for positioning context of fixed elements if needed */}
          <Sidebar
            pages={initialPages}
            mediaItems={initialMediaLinks}
            activePageId={activePageId}
            onSelectPage={handlePageSelect}
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
          <main className="flex-1 bg-white p-6 overflow-y-auto">
            <PageEditorHeader
              pageTitle={currentPageData.title}
              pageDescription={currentPageData.description}
              onPageTitleChange={handlePageTitleChange}
              onSave={handleSavePage}
              currentEditorView={editorView}
              onToggleEditorView={toggleEditorView}
            />
            {editorView === 'visual' ? (
              <>
                <TabsComponent activeTab={activeVisualTab} onTabChange={setActiveVisualTab} />
                <div id="tab-panels">
                  {activeVisualTab === 'content' && <ContentPanel data={currentPageData.content} onDataChange={handleContentDataChange} onFileChange={handleFileUpload} />}
                  {activeVisualTab === 'media' && <MediaPanel mediaAssets={currentPageData.media} />}
                  {activeVisualTab === 'settings' && <SettingsPanel data={currentPageData.settings} onDataChange={handleSettingsDataChange} />}
                </div>
              </>
            ) : (
              <CodeEditorView codeData={currentPageData.code} onCodeChange={handleCodeDataChange} />
            )}
          </main>
          
          {/* AI Chat Components - Rendered outside main scroll, but within the flex container for layout context */}
          {!isChatOpen && <AiChatButton onToggleChat={toggleChatPanel} />}
          <AiChatPanel isOpen={isChatOpen} onClose={toggleChatPanel} />
        </div>
      </div>
    </>
  );
};

export default TestPageAI;
