import React, { useState, useEffect, /*useRef,*/ /*type ChangeEvent,*/ /*type FormEvent*/ } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import GlobalHeader from '../header/Header';
import { makeSiteDependencies, SiteDefaultState, type Site } from '../../../models/siteContentCreation/Site';
import Sidebar from '../sidebar/Sidebar';
import { ChatDefaultState, type Chat } from '../../../models/AIConnection/Chat';
import { type Message } from '../../../models/AIConnection/Message';
import type { Property } from '../../../models/siteContentCreation/Property';
import { MapSiteToSiteSaveDTO, type SiteSaveDto } from '../../../models/DTOs/SiteDTOs/SiteSaveDto';
import { toast, ToastContainer } from 'react-toastify';

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
  code: PageCodeData;
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
    code: {
      html: '',
      css: '',
    },
};

type ActiveTab = 'content' | 'media' | 'settings';
type EditorView = 'visual' | 'code';
type ActiveCodeEditorTab = 'html' | 'css';


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
    position: relative; /* Changed from fixed for better layout in editor */
    bottom: 0;
    width: 100%;
}
`;


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
  .code-textarea {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    min-height: 400px;
    background-color: #1e1e1e; /* Dark background for code */
    color: #d4d4d4; /* Light text for code */
    border-radius: 0.375rem; /* rounded-md */
    padding: 1rem; /* p-4 */
    line-height: 1.5;
    white-space: pre;
    overflow: auto;
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
  currentEditorView: EditorView;
  onToggleEditorView: (view: EditorView) => void;
}
const PageEditorHeader: React.FC<PageEditorHeaderProps> = ({ pageTitle, pageDescription, onPageTitleChange, onSave, currentEditorView, onToggleEditorView }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
    <div>
      <input
        type="text"
        value={pageTitle}
        onChange={(e) => onPageTitleChange(e.target.value)}
        className="text-2xl font-semibold text-gray-800 border-none p-0 focus:ring-0 focus:border-transparent w-auto inline-block bg-transparent"
        readOnly={currentEditorView === 'code'} // Make title non-editable in code view for simplicity
      />
      <p className="text-sm text-gray-500">{pageDescription}</p>
    </div>
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onToggleEditorView('visual')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md border flex items-center
          ${currentEditorView === 'visual' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'}`}
      >
        <Icon iconClass="fas fa-palette" className="mr-2" /> Visual
      </button>
      <button 
        onClick={() => onToggleEditorView('code')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md border flex items-center
                    ${currentEditorView === 'code' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'}`}
      >
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

type ContentPanelProps = {
  site: Site;
  setSite: React.Dispatch<React.SetStateAction<Site>>;
};
const ContentPanel: React.FC<ContentPanelProps> = ({ site, setSite }) => {
  // console.log('site', site);
  // console.log('site.documentTypes[0].contents[0]', site.documentTypes[0].contents[0]);

  if (site.siteId === 0) {
    return (<div></div>);
  }

  const contentPropertyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    setSite(prev => {
      prev.documentTypes[0].contents[0].contentProperties[index].value = e.target.value;
      return {
        ...prev
      };
    });
  };

  // console.log('site.documentTypes[0].contents[0].contentProperties', site.documentTypes[0].contents[0].contentProperties);
  // console.log('site.documentTypes[0].contents[0].contentProperties[0].property', site.documentTypes[0].contents[0].contentProperties[0].property);
  return (
    <div className="space-y-6">
      {/* Header section */
        /*
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
        */
      }


      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Main Content</h3>
        <p className="text-xs text-gray-500 mb-4">Primary content of the page.</p>
        <div className="space-y-4">
          {site.documentTypes[0].contents[0].contentProperties.map((contentProperty, index) => (
            <div key={index}>
              {/* contentProperty.property.propertyName */}
              <label htmlFor="main-headline" className="block text-sm font-medium text-gray-700 mb-1">
                {site.documentTypes[0].properties.find(p => p.propertyId == contentProperty.propertyId)?.propertyName}
              </label>
              <input type="text" id="main-headline" value={contentProperty.value} 
                className="form-input w-full p-2 border rounded-md shadow-sm text-base" 
                onChange={(e) => { contentPropertyChange(e, index); }}
              />
            </div>
          ))}
          {/* old main section */
            /*
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
                {// In a real app, use a rich text editor component here and bind its value to data.bodyText }
                <div className="text-gray-400 p-4" dangerouslySetInnerHTML={{ __html: data.bodyText }}></div>
              </div>
            </div>
            <div>
              <label htmlFor="cta-button" className="block text-sm font-medium text-gray-700 mb-1">Call to Action Button Text</label>
              <input type="text" id="cta-button" value={data.ctaButton} onChange={(e) => onDataChange('ctaButton', e.target.value)} className="form-input w-full p-2 border rounded-md shadow-sm text-base" />
            </div>
            */
          }
        </div>
      </div>

      {/* Image section */
        /*
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
        */
      }
    </div>
  );
};

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

type SettingsPanelProps = {
  site: Site;
  setSite: React.Dispatch<React.SetStateAction<Site>>;
}
const SettingsPanel: React.FC<SettingsPanelProps> = ({ site, setSite }) => {

  const addNewSetting = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const newProperty: Property = {
      propertyId: 0,
      propertyName: '',
      dataType: 'text/string',

      documentTypeId: site.documentTypes[0].documentTypeId,
      documentType: site.documentTypes[0],

      contentProperties: [],
    };

    setSite(prev => {

      const updatedDocumentTypes = [...prev.documentTypes];
      const firstDocType = { ...updatedDocumentTypes[0] };
      const updatedProperties = [...firstDocType.properties, newProperty];

      firstDocType.properties = updatedProperties;
      updatedDocumentTypes[0] = firstDocType;

      return {
        ...prev,
        documentTypes: updatedDocumentTypes,
      }
    });
  };

  const propertyOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    
    setSite(prev => {
      prev.documentTypes[0].properties[index].propertyName = e.target.value;
      return {
        ...prev
      };
    });
  }

  const deleteProperty = (index: number) => {
    setSite(prev => {
      const updatedDocumentTypes = [...prev.documentTypes];
      const firstDocType = { ...updatedDocumentTypes[0] };
      const updatedProperties = [...firstDocType.properties.filter((_, _index) => _index !== index )];

      firstDocType.properties = updatedProperties;
      updatedDocumentTypes[0] = firstDocType;

      return {
        ...prev,
        documentTypes: updatedDocumentTypes,
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Page Settings</h3>
        <p className="text-xs text-gray-500 mb-4">Configure various options for this page.</p>
        <div className="space-y-4">
          {site.documentTypes[0].properties.map((property, index) => (
            <div key={index} >
              <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-1">{property.dataType}</label>
              <div className="flex">
                <input type="text" id="seo-title" value={property.propertyName} className="form-input w-full p-2 border rounded-md shadow-sm"
                  onChange={(e) => { propertyOnChange(e, index) }}
                />  
                <button
                  onClick={() => deleteProperty(index)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                  title={`Delete ${property.propertyName} field`}
                >
                  <Icon iconClass="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <a onClick={(e) => addNewSetting(e) } className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 mt-4">
        <Icon iconClass="fas fa-plus-circle" className="mr-3 w-5 text-center" />
        Add New Setting
      </a>
    </div>
  )
};

// --- Code Editor ---
interface PageCodeData {
  html: string;
  css: string;
  // js?: string; // Optional for future expansion
}
type CodeEditorViewProps = {
  codeData: PageCodeData;
  onCodeChange: (type: keyof PageCodeData, newCode: string) => void;
}
const CodeEditorView: React.FC<CodeEditorViewProps> = ({ codeData, onCodeChange }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<ActiveCodeEditorTab>('html');

  // console.log('codeData.html', codeData.html);

  if ((codeData.html && codeData.html.length === 0)) {
    codeData.html = placeholderHTML;
  }
  if ((codeData.css && codeData.css.length === 0)) {
    codeData.css = placeholderCSS;
  }

  // console.log('codeData.html', codeData.html);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Code Tabs">
          <button
            onClick={() => setActiveCodeTab('html')}
            className={`tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeCodeTab === 'html' ? 'active text-indigo-600 border-indigo-500' : 'text-gray-500 hover:text-indigo-600 hover:border-indigo-500'}`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveCodeTab('css')}
            className={`tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeCodeTab === 'css' ? 'active text-indigo-600 border-indigo-500' : 'text-gray-500 hover:text-indigo-600 hover:border-indigo-500'}`}
          >
            CSS
          </button>
          {/* Add JS tab if needed in future */}
        </nav>
      </div>

      {activeCodeTab === 'html' && (
        <div>
          <label htmlFor="html-code-editor" className="block text-sm font-medium text-gray-700 mb-2">HTML Code</label>
          <textarea
            id="html-code-editor"
            value={ codeData.html }
            onChange={(e) => onCodeChange('html', e.target.value)}
            className="code-textarea w-full"
            spellCheck="false"
          />
        </div>
      )}

      {activeCodeTab === 'css' && (
        <div>
          <label htmlFor="css-code-editor" className="block text-sm font-medium text-gray-700 mb-2">CSS Code</label>
          <textarea
            id="css-code-editor"
            value={ codeData.css }
            onChange={(e) => onCodeChange('css', e.target.value)}
            className="code-textarea w-full"
            spellCheck="false"
          />
        </div>
      )}
    </div>
  );
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

type AiChatPanelProps = { 
  userId: number,
  isOpen: boolean; 
  onClose: () => void; 
}
const AiChatPanel: React.FC<AiChatPanelProps> = ({ userId, isOpen, onClose }) => {

  const [prompt, setPrompt] = useState<string>('');
  const [chat, setChat] = useState<Chat>({...ChatDefaultState, userId: userId });

  const sendPrompt = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newMessage: Message = {
      messageId: 0,
      userRequest: prompt,
      aiResponse: '',
      chat: chat,
      chatId: chat.chatId,
    }

    setChat(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        newMessage
      ]
    }));

    if (prompt && prompt.length > 0) {
      axios.get<any>(`aiApi/ai?prompt=${prompt}&ContentId=${1}`)
        .then((response) => {
          console.log('response', response);
          console.log('aiResponse', response.data.candidates[0].content.parts[0].text);

          setChat((prev) => {
            
            const messages = [...prev.messages];
            const lastIndex = messages.length - 1;

            if (lastIndex >= 0) {
              messages[lastIndex] = {
                ...messages[lastIndex],
                aiResponse : response.data.candidates[0].content.parts[0].text,
              }
            }

            return {
              ...prev,
              messages: messages,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
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
        {/*
          <div className="p-2 bg-indigo-50 rounded-lg self-start max-w-[85%] break-words">How can I improve SEO for this page?</div>
          <div className="p-2 bg-gray-200 rounded-lg self-end text-right ml-auto max-w-[85%] break-words">You can start by optimizing your meta description and ensuring relevant keywords are used in the content.</div>
        */}
        <div className="mt-3 space-y-2 text-xs">
          {chat && chat.messages.length > 0 && chat.messages.map((message, index) => (
            <div key={index}>
              <div className="p-2 bg-indigo-50 rounded-lg self-start max-w-[85%] break-words">{message.userRequest}</div>
              <div className="p-2 bg-gray-200 rounded-lg self-end ml-auto max-w-[85%] break-words whitespace-pre-wrap">{message.aiResponse}</div> {/* text-right */}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex-shrink-0">
        <textarea
          className="form-textarea w-full p-2 border rounded-md shadow-sm text-sm"
          rows={3}
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); } }
        />
        <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium"
          onClick={(e) => { sendPrompt(e); }}
        >
          Send
        </button>
      </div>
    </div>
  )
};


// --- Main App Component ---
const SitePage: React.FC = () => {
  const navigate = useNavigate();

  const [activePageId, setActivePageId] = useState<number>(0); // 'home'
  const [currentPageData, setCurrentPageData] = useState<PageData>(PageDataDefault); // initialPageData.home
  const [activeVisualTab, setActiveVisualTab] = useState<ActiveTab>('content');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [editorView, setEditorView] = useState<EditorView>('visual');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // New state for AI Chat

  // const [pages, setPages] = useState<PageLink>();

  const [site, setSite] = useState<Site>(SiteDefaultState);
  
  const [madeDependency, setMadeDependency] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
      return <Navigate to="/" replace />;
  }
  
  const siteId = Number.parseInt(searchParams.get("siteId") ?? '') ?? 0;

  useEffect(() => {
    if (siteId !== 0) {
      axios.get<Site>(`api/site/${siteId}/withAll`)
        .then((response) => {
          // console.log('response.data', response.data);
          setSite(response.data);
        })
        .catch((error) => {
          console.error(error)
          setCurrentPageData(PageDataDefault);
          navigate(`/sites?userId=${userId}`);
        });
    }
  }, []);

  useEffect(() => {
    if(site.siteId !== 0) {
      const siteWithD = makeSiteDependencies(site);
      setSite(siteWithD);
      setCurrentPageData(prev => ({
        ...prev,
        id: site.siteId,
        title: site.documentTypes[0]?.contents[0]?.contentName,
        description: ''
      }));
      setMadeDependency(true);
    }
  }, [site])

  useEffect(() => {
    // Simulate fetching page data when activePageId changes
    // setCurrentPageData({}); // initialPageData[activePageId] || initialPageData.home || {}
    // Reset to content tab when page changes
    setActiveVisualTab('content');
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
    // console.log("Saving page:", activePageId, currentPageData);
    // In a real app, send data to backend API
    // alert("Page data saved to console!");
    // console.log('site to save', site);

    const _objectToSave: SiteSaveDto = MapSiteToSiteSaveDTO(site);
    // console.log('object to save', _objectToSave);
    axios.put<any>(`api/Site/RealUpdate/${site.siteId}`, _objectToSave)
      .then((response) => {
        console.log('response', response.data);
        setSite(response.data);
        toast.success("Data saved successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to save data");
      });
  };

  /*const handleContentDataChange = (field: keyof ContentData, value: string) => {
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
  };*/

  /*const handleSettingsDataChange = (field: keyof SettingsData | `advancedFieldType-${string}`, value: string | boolean) => {
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
  };*/

  const handleCodeDataChange = (type: keyof PageCodeData, newCode: string) => {
    console.log('newCode', newCode);
    setCurrentPageData(prev => ({
      ...prev,
      code: { ...prev.code, [type]: newCode },
    }));
    setSite(prev => ({
      ...prev,
      documentTypes: prev.documentTypes.map((docType, index) => index === 0 ? { ...docType, code: {
          codeId: docType.code.codeId,
          codeValue: newCode,
          documentTypeId: docType.code.documentTypeId,
          documentType: docType.code.documentType,
        } } : docType),
    }));
  };

  const toggleEditorView = (view: EditorView) => {
    setEditorView(view);
  };

  const toggleChatPanel = () => setIsChatOpen(prev => !prev); // Toggle AI Chat panel

  return (
    <>
      <style>{globalStyles}</style>
      <div className="flex flex-col h-screen">
        <GlobalHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            pages={site.documentTypes[0]?.contents.map((content) => {
              return {
                id: content.contentId,
                name: content.contentName,
                icon: 'fas fa-home'
              }
            })} // initialPages
            mediaItems={[]} // initialMediaLinks
            settingItems={site.documentTypes.map(doctype => {
              return {
                id: doctype.documentTypeId,
                name: doctype.name,
                icon: 'fas fa-info-circle',
              }
            })}
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
                  {activeVisualTab === 'content' && site.siteId !== 0 && madeDependency && <ContentPanel site={site} setSite={setSite} /> }
                  {activeVisualTab === 'media' && <MediaPanel mediaAssets={currentPageData.media} />}
                  {activeVisualTab === 'settings' && site.siteId !== 0 && madeDependency && <SettingsPanel site={site} setSite={setSite} />}
                </div>
              </>
            ) : (
              <>
                {site.siteId !== 0 && madeDependency &&
                  <CodeEditorView codeData={{
                    html: site.documentTypes[0].code.codeValue,
                    css: '',
                  }} onCodeChange={handleCodeDataChange} />
                }
              </>
            )}
            {
              /*
              <div id="tab-panels">
                {currentPageData.id !== -1 && activeTab === 'content' && site.siteId !== 0 && madeDependency && <ContentPanel site={site} />} //{currentPageData.content}
                {currentPageData.id !== -1 && activeTab === 'media' && <MediaPanel mediaAssets={currentPageData.media} />}
                {activeTab === 'settings' && <SettingsPanel data={currentPageData.settings} onDataChange={handleSettingsDataChange} />}
              </div>


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
              */
            }
          </main>

          {/* AI Chat Components - Rendered outside main scroll, but within the flex container for layout context */}
          {!isChatOpen && <AiChatButton onToggleChat={toggleChatPanel} />}
          {site.siteId !== 0 && madeDependency && <AiChatPanel isOpen={isChatOpen} onClose={toggleChatPanel} userId={site.userId} />}


          <ToastContainer />
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