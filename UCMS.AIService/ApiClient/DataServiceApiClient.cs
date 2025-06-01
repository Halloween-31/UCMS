using System.Net.Http;
using UCMS.Models.DbModels.AIConnectionModels;
using UCMS.Models.DbModels.SiteContentCreation;

namespace UCMS.AIService.ApiClient
{
    public class DataServiceApiClient(HttpClient httpClient)
    {
        /*private readonly HttpClient _httpClient;

        public DataServiceApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("http://dataservice/");
        }*/

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

        public async Task<Content?> GetFullContentById(int contentId)
        {
            Content? content = await httpClient.GetFromJsonAsync<Content>($"/Content/GetFullContent/{contentId}");
            return content;
        }
    }
}
