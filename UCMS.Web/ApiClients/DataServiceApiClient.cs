using UCMS.Models.DbModels;

namespace UCMS.Web.ApiClients
{
    public class DataServiceApiClient(HttpClient httpClient)
    {
        public async Task<IEnumerable<Site>> GetAllSites()
        {
            List<Site> sites = new List<Site>();

            await foreach (var site in httpClient.GetFromJsonAsAsyncEnumerable<Site>("/Site"))
            {
                if (site != null) 
                { 
                    sites.Add(site);
                }
            }

            return sites;
        }

        public async Task<Site?> GetSiteWithAll(int siteId)
        {
            Site? site = await httpClient.GetFromJsonAsync<Site>($"/Site/{siteId}/withAll");
            return site;
        }

        public async Task<string?> GetPageCode(int siteId, int pageId)
        {
            string? code = await httpClient.GetStringAsync($"/Site/{siteId}/page/{pageId}");
            return code;
        }
    }
}
