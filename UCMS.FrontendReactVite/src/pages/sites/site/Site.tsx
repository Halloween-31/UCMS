import React, { useState, useEffect, /*useRef,*/ type ChangeEvent, /*type FormEvent*/ } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import GlobalHeader from '../header/Header';
import { SiteDefaultState, type Site } from '../../../models/Site';
import Sidebar from '../sidebar/Sidebar';

// --- TypeScript Interfaces ---

interface ContentData {
  headerTitle: string;
  mainHeadline: string;
  subtitle: string;
  bodyText: string; // Placeholder for rich text, actual implementation would differ
  ctaButton: string;
  currentImageUrl: string | null;
}

interface MediaAsset {
  id: number;
  name: string;
  url: string;
  type: 'image' | 'video';
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
  id: number;
  title: string;
  description: string;
  content: ContentData;
  media: MediaAsset[];
  settings: SettingsData;
}

const PageDataDefault : PageData = /*{
  id: 0,
  title: '',
  description: '',
  content: {
    headerTitle: '',
    mainHeadline: '',
    subtitle: '',
    bodyText: '',
    ctaButton: '',
    currentImageUrl: '',
  },
  media: [],
  settings: {
    pageSlug: '',
    seoTitle: '',
    seoDescription: '',
    publishStatus: false,
    advancedFields: [],
  },
};*/
{
    id: 0,
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
      { id: 0, name: 'Image1.jpg', url: 'https://placehold.co/200x200/A5B4FC/3730A3?text=Image1.jpg', type: 'image' },
      { id: 1, name: 'PromoVideo.mp4', url: '', type: 'video' }, // Placeholder for video
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
};

type ActiveTab = 'content' | 'media' | 'settings';


// --- Initial Data (Placeholders) ---
/*const initialPages: PageLink[] = [
  { id: 'home', name: 'Home', icon: 'fas fa-home' },
  { id: 'about', name: 'About', icon: 'fas fa-info-circle' },
  { id: 'services', name: 'Services', icon: 'fas fa-concierge-bell' },
  { id: 'contact', name: 'Contact', icon: 'fas fa-envelope' },
];*/

/*const initialMediaLinks: MediaLink[] = [
  { id: 0, name: 'Logo.png', icon: 'fas fa-image', type: 'image' },
  { id: 1, name: 'HeroVideo.mp4', icon: 'fas fa-video', type: 'video' },
];*/

/*const initialPageData: Record<string, PageData> = {
  home: {
    id: 0,
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
      { id: 0, name: 'Image1.jpg', url: 'https://placehold.co/200x200/A5B4FC/3730A3?text=Image1.jpg', type: 'image' },
      { id: 1, name: 'PromoVideo.mp4', url: '', type: 'video' }, // Placeholder for video
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
  },
  // Add more pages as needed
};*/


// --- Styling (from original HTML) ---
const globalStyles = `
  body {
      font-family: 'Inter', sans-serif;
      background-color: #f0f2f5;
  }
  ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
  }
  ::-webkit-scrollbar-track {
      background: #e0e0e0;
      border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
      background: #a0a0a0;
      border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
      background: #808080;
  }
  .tab-button.active {
      border-bottom-color: #4f46e5; /* Indigo-600 */
      color: #4f46e5;
      font-weight: 600;
  }
  .sidebar-link.active {
      background-color: #e0e7ff; /* Indigo-100 */
      color: #3730a3; /* Indigo-800 */
      font-weight: 600;
  }
  .form-input, .form-textarea {
      border-color: #d1d5db; /* Gray-300 */
  }
  .form-input:focus, .form-textarea:focus {
      border-color: #4f46e5; /* Indigo-600 */
      box-shadow: 0 0 0 1px #4f46e5;
  }
`;

// --- Icon Component ---
interface IconProps {
  iconClass: string;
  className?: string;
  title?: string;
}
export const Icon: React.FC<IconProps> = ({ iconClass, className, title }) => (
  <i className={`${iconClass} ${className || ''}`} title={title}></i>
);

// --- Components ---

interface PageEditorHeaderProps {
  pageTitle: string;
  pageDescription: string;
  onPageTitleChange: (newTitle: string) => void;
  onSave: () => void;
}
const PageEditorHeader: React.FC<PageEditorHeaderProps> = ({ pageTitle, pageDescription, onPageTitleChange, onSave }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
    <div>
      <input
        type="text"
        value={pageTitle}
        onChange={(e) => onPageTitleChange(e.target.value)}
        className="text-2xl font-semibold text-gray-800 border-none p-0 focus:ring-0 focus:border-transparent w-auto inline-block bg-transparent"
      />
      <p className="text-sm text-gray-500">{pageDescription}</p>
    </div>
    <div className="flex items-center space-x-2">
      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 flex items-center">
        <Icon iconClass="fas fa-info-circle" className="mr-2" /> Info
      </button>
      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 flex items-center">
        <Icon iconClass="fas fa-code" className="mr-2" /> Code
      </button>
      <button onClick={onSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm flex items-center">
        <Icon iconClass="fas fa-save" className="mr-2" /> Save Page
      </button>
    </div>
  </div>
);

interface TabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}
const TabsComponent: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'content', label: 'Content' },
    { id: 'media', label: 'Media' },
    { id: 'settings', label: 'Settings' },
  ];
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-indigo-600 hover:border-indigo-500 ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

interface ContentPanelProps {
  data: ContentData;
  onDataChange: (field: keyof ContentData, value: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const ContentPanel: React.FC<ContentPanelProps> = ({ data, onDataChange, onFileChange }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Header Section</h3>
      <p className="text-xs text-gray-500 mb-4">Main headline and branding for the page.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="header-title" className="block text-sm font-medium text-gray-700 mb-1">Page Title / Brand</label>
          <input type="text" id="header-title" value={data.headerTitle} onChange={(e) => onDataChange('headerTitle', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" />
        </div>
      </div>
    </div>

    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Main Content</h3>
      <p className="text-xs text-gray-500 mb-4">Primary content of the page.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="main-headline" className="block text-sm font-medium text-gray-700 mb-1">Main Headline</label>
          <input type="text" id="main-headline" value={data.mainHeadline} onChange={(e) => onDataChange('mainHeadline', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" />
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <textarea id="subtitle" rows={3} value={data.subtitle} onChange={(e) => onDataChange('subtitle', e.target.value)} className="form-textarea w-full p-2 border rounded-md shadow-sm text-base"></textarea>
        </div>
        <div>
          <label htmlFor="body-text" className="block text-sm font-medium text-gray-700 mb-1">Body Content (Rich Text)</label>
          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white min-h-[150px]">
            {/* In a real app, use a rich text editor component here and bind its value to data.bodyText */}
            <div className="text-gray-400 p-4" dangerouslySetInnerHTML={{ __html: data.bodyText }}></div>
          </div>
        </div>
        <div>
          <label htmlFor="cta-button" className="block text-sm font-medium text-gray-700 mb-1">Call to Action Button Text</label>
          <input type="text" id="cta-button" value={data.ctaButton} onChange={(e) => onDataChange('ctaButton', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" />
        </div>
      </div>
    </div>

    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Image Section</h3>
      <p className="text-xs text-gray-500 mb-4">Featured image for this page.</p>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Icon iconClass="fas fa-image fa-3x" className="text-gray-400 mx-auto" />
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onFileChange} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {data.currentImageUrl && (
        <div className="mt-4">
          <img src={data.currentImageUrl} alt="Current Page Image" className="rounded-md shadow-sm max-h-48 mx-auto" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://placehold.co/300x150/CCCCCC/999999?text=No+Image'; e.currentTarget.onerror = null; }} />
        </div>
      )}
    </div>
  </div>
);

interface MediaPanelProps {
  mediaAssets: MediaAsset[];
}
const MediaPanel: React.FC<MediaPanelProps> = ({ mediaAssets }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Page Media Assets</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaAssets.map(asset => (
          <div key={asset.id} className="group relative border border-gray-200 rounded-lg overflow-hidden">
            {asset.type === 'image' ? (
              <img src={asset.url} alt={asset.name} className="w-full h-32 object-cover" />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <Icon iconClass="fas fa-file-video fa-3x" className="text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
              <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 hover:bg-red-600 rounded-full text-xs" title="Delete">
                <Icon iconClass="fas fa-trash-alt" />
              </button>
            </div>
            <p className="text-xs text-gray-600 p-2 truncate">{asset.name}</p>
          </div>
        ))}
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-indigo-500">
          <div className="text-center">
            <Icon iconClass="fas fa-plus-circle text-2xl" className="text-gray-400" />
            <p className="text-xs text-gray-500 mt-1">Add Media</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface SettingsPanelProps {
  data: SettingsData;
  onDataChange: (field: keyof SettingsData | `advancedFieldType-${string}`, value: string | boolean) => void;
}
const SettingsPanel: React.FC<SettingsPanelProps> = ({ data, onDataChange }) => (
  <div className="space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Page Settings</h3>
      <p className="text-xs text-gray-500 mb-4">Configure various options for this page.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="page-slug" className="block text-sm font-medium text-gray-700 mb-1">Page Slug (URL)</label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              yourdomain.com/
            </span>
            <input type="text" id="page-slug" value={data.pageSlug} onChange={(e) => onDataChange('pageSlug', e.target.value)} className="form-input flex-1 block w-full rounded-none rounded-r-md p-2 border sm:text-sm" />
          </div>
        </div>
        <div>
          <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
          <input type="text" id="seo-title" value={data.seoTitle} onChange={(e) => onDataChange('seoTitle', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 mb-1">SEO Meta Description</label>
          <textarea id="seo-description" rows={3} value={data.seoDescription} onChange={(e) => onDataChange('seoDescription', e.target.value)} className="form-textarea w-full p-2 border rounded-md shadow-sm"></textarea>
        </div>
        <div className="flex items-center">
          <input id="publish-status" name="publish-status" type="checkbox" checked={data.publishStatus} onChange={(e) => onDataChange('publishStatus', e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
          <label htmlFor="publish-status" className="ml-2 block text-sm text-gray-900">
            Publish this page
          </label>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Advanced Settings</h3>
      <p className="text-xs text-gray-500 mb-4">Define field types (mimicking your image).</p>
      <div className="space-y-4">
        {data.advancedFields.map((field) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field: {field.label}</label>
              <p className="text-xs text-gray-500">{field.description}</p>
            </div>
            <div>
              <label htmlFor={`type-${field.id}`} className="block text-xs font-medium text-gray-500 mb-1">Type</label>
              <input
                type="text"
                id={`type-${field.id}`}
                value={field.typeValue}
                onChange={(e) => onDataChange(`advancedFieldType-${field.id}`, e.target.value)}
                className="form-input w-full p-2 border rounded-md shadow-sm text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


// --- Main App Component ---
const SitePage: React.FC = () => {
  const navigate = useNavigate();

  const [activePageId, setActivePageId] = useState<number>(0); // 'home'
  const [currentPageData, setCurrentPageData] = useState<PageData>(PageDataDefault); // initialPageData.home
  const [activeTab, setActiveTab] = useState<ActiveTab>('content');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');

  // const [pages, setPages] = useState<PageLink>();

  const [site, setSite] = useState<Site>(SiteDefaultState);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
      return <Navigate to="/" replace />;
  }
  
  const siteId = searchParams.get("siteId");

  useEffect(() => {
    axios.get<Site>(`api/site/${siteId}/withAll`)
      .then((response) => {
        console.log('response.data', response.data);
        setSite(response.data);
      })
      .catch((error) => {
        console.error(error)
        setCurrentPageData(PageDataDefault);
        navigate(`/sites?userId=${userId}`);
      });
  }, []);

  useEffect(() => {
    // Simulate fetching page data when activePageId changes
    // setCurrentPageData({}); // initialPageData[activePageId] || initialPageData.home || {}
    // Reset to content tab when page changes
    setActiveTab('content');
  }, [activePageId]);

  const handlePageSelect = (pageId: number) => {
    setActivePageId(pageId);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    // Here you might refetch data for the new language or apply translations
    console.log("Language changed to:", lang);
  };

  const handlePageTitleChange = (newTitle: string) => {
    setCurrentPageData(prev => ({ ...prev, title: newTitle }));
  };

  const handleSavePage = () => {
    console.log("Saving page:", activePageId, currentPageData);
    // In a real app, send data to backend API
    alert("Page data saved to console!");
  };

  const handleContentDataChange = (field: keyof ContentData, value: string) => {
    setCurrentPageData(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value },
    }));
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentPageData(prev => ({
                ...prev,
                content: { ...prev.content, currentImageUrl: reader.result as string }
            }));
        };
        reader.readAsDataURL(file);
        console.log("Uploaded file:", file.name);
    }
  };

  const handleSettingsDataChange = (field: keyof SettingsData | `advancedFieldType-${string}`, value: string | boolean) => {
    setCurrentPageData(prev => {
      if (typeof field === 'string' && field.startsWith('advancedFieldType-')) {
        const fieldId = field.replace('advancedFieldType-', '');
        return {
          ...prev,
          settings: {
            ...prev.settings,
            advancedFields: prev.settings.advancedFields.map(f =>
              f.id === fieldId ? { ...f, typeValue: value as string } : f
            ),
          },
        };
      }
      return {
        ...prev,
        settings: { ...prev.settings, [field as keyof SettingsData]: value },
      };
    });
  };


  return (
    <>
      <style>{globalStyles}</style>
      <div className="flex flex-col h-screen">
        <GlobalHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            pages={[]} // initialPages
            mediaItems={[]} // initialMediaLinks
            settingItems={[]}
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
            />
            <TabsComponent activeTab={activeTab} onTabChange={setActiveTab} />
            <div id="tab-panels">
              {currentPageData.id !== -1 && activeTab === 'content' && <ContentPanel data={currentPageData.content} onDataChange={handleContentDataChange} onFileChange={handleFileUpload} />}
              {currentPageData.id !== -1 && activeTab === 'media' && <MediaPanel mediaAssets={currentPageData.media} />}
              {activeTab === 'settings' && <SettingsPanel data={currentPageData.settings} onDataChange={handleSettingsDataChange} />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SitePage;

// To run this:
// 1. Ensure you have a React + TypeScript project set up.
// 2. Save this code as App.tsx in your src directory.
// 3. Make sure Tailwind CSS is configured for your project.
// 4. Link Font Awesome in your public/index.html or install react-fontawesome.
// 5. Link Google Fonts (Inter) in public/index.html.
// Example public/index.html additions:
/*
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
*/
// 6. Your main index.tsx should render this App component.

/*
                    {activeTab === 'content' && <ContentPanel data={currentPageData.content} onDataChange={handleContentDataChange} onFileChange={handleFileUpload} />}
                    {activeTab === 'media' && <MediaPanel mediaAssets={currentPageData.media} />}
                    {activeTab === 'settings' && <SettingsPanel data={currentPageData.settings} onDataChange={handleSettingsDataChange} />}
*/