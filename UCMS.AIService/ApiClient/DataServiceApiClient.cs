using UCMS.Models.DbModels.AIConnectionModels;

namespace UCMS.AIService.ApiClient
{
    public class DataServiceApiClient(HttpClient httpClient)
    {
        public async Task<object> SaveMessageGetResult(Chat chat)
        {
            /*List<Site> sites = new List<Site>();

            await foreach (var site in httpClient.GetFromJsonAsAsyncEnumerable<Site>("/Site"))
            {
                if (site != null)
                {
                    sites.Add(site);
                }
            }

            return sites;*/

            //httpClient.PutAsJsonAsync

            return null;
        }
    }
}
