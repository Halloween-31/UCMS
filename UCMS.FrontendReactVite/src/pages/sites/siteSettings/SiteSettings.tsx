import { useEffect, useState } from "react";
// import { type DocumentType } from "../../../models/DocumentType";
import { SiteDefaultState, type Site } from "../../../models/Site";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import GlobalHeader from "../header/Header";
import { Icon } from "../site/Site";
import Sidebar from "../sidebar/Sidebar";

const Settings: React.FC = () => {
  const [site, setSite] = useState<Site>(SiteDefaultState);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
      return <Navigate to="/" replace />;
  }
  
  const siteId = searchParams.get("siteId");

  useEffect(() => {
    axios.get<Site>(`/api/site/${siteId}/doctypes&props`)
      .then((response) => {
        console.log('response.data', response.data);
        setSite(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (site) {
      console.log("Updated site", site);
    }
  }, [site]);

  const [selectedSetting, setSelectedSetting] = useState<number | undefined>(undefined);

  useEffect(() => {
    console.log('selectedSetting', selectedSetting);
  }, [selectedSetting]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <GlobalHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            pages={[]} 
            mediaItems={[]} 
            settingItems={site.documentTypes.map(doctype => {
              return {
                id: doctype.documentTypeId,
                name: doctype.name,
                icon: 'fas fa-info-circle',
              }
            })}
            activePageId={-1}
            onSelectPage={() => {}}
            selectedLanguage={''}
            onLanguageChange={() => {}}
          />
          <main className="flex-1 bg-white p-6 overflow-y-auto">
            {selectedSetting === undefined && site.documentTypes && site.documentTypes.length > 0 && (
              <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</h3>
                  <nav className="space-y-1">
                      {site.documentTypes.map((docType, index) => (
                          <a
                              key={docType.documentTypeId}
                              href="#"
                              onClick={(e) => 
                                { 
                                  e.preventDefault(); 
                                  console.log('index of element', index);
                                  setSelectedSetting(index);
                                }
                              }
                              className={`sidebar-link group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200`}
                          >
                              <Icon iconClass={/*change later*/'fas fa-info-circle'} className="mr-3 text-gray-500 group-hover:text-gray-700 w-5 text-center" />
                              {docType.name}
                          </a>
                      ))}
                      <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 mt-4">
                          <Icon iconClass="fas fa-plus-circle" className="mr-3 w-5 text-center" />
                          Add New Setting
                      </a>
                  </nav>
              </div>
            )}
            {selectedSetting !== undefined && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Page Settings</h3>
                  <p className="text-xs text-gray-500 mb-4">Configure various options for this page.</p>
                  <div className="space-y-4">
                    {site.documentTypes[selectedSetting].properties.map((property, index) => (
                      <div key={index}>
                        <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-1">{property.propertyName}</label>
                        <input type="text" id="seo-title" value={property.dataType} className="form-input w-full p-2 border rounded-md shadow-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
};

export default Settings;

/*
<div>
  <label htmlFor="page-slug" className="block text-sm font-medium text-gray-700 mb-1">Page Slug (URL)</label>
  <div className="flex rounded-md shadow-sm">
    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
      yourdomain.com/
    </span>
    <input type="text" id="page-slug" value={'data.pageSlug'} className="form-input flex-1 block w-full rounded-none rounded-r-md p-2 border sm:text-sm" />
  </div>
</div>
*/













/*
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

*/