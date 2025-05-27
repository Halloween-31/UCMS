using System.Diagnostics;
using System.Text.Json;
using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Identity.Client;
using Mscc.GenerativeAI;
using static Google.Apis.Requests.BatchRequest;

namespace UCMS.AIService.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class AIController
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AIController> _logger;

        private readonly string apiKeyGemini;
        public AIController(IConfiguration configuration, ILogger<AIController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            apiKeyGemini = _configuration["ApiKeyGemini"] ?? throw new NullReferenceException("ApiKeyGemini is not set in appsetting.json!");
        }

        [HttpGet]
        public async Task<ActionResult<object>> AskAI(string prompt)
        {
            //string prompt = "What are the benefits of learning a new language?";

            // 1. We have message and API key
            if (string.IsNullOrEmpty(apiKeyGemini))
            {
                throw new NullReferenceException("ApiKeyGemini is not set in appsetting.json!");
            }

            GenerateContentResponse response = null;

            try
            {
                // 2. Initialize the Gemini AI client
                var googleAI = new GoogleAI(apiKey: apiKeyGemini);

                // For text-only input, use the gemini-pro model
                // 3. Select the Gemini 1.5 Flash model
                //var model = googleAI.GenerativeModel(model: Model.GeminiPro);
                var model = googleAI.GenerativeModel(model: Model.Gemini15Flash);

                // 4. Define Generation Configuration (all possible common parameters)
                var generationConfig = new GenerationConfig
                {
                    Temperature = 0.9f, // Controls randomness. Higher values (0.0 - 1.0) mean more random outputs.
                    TopP = 0.95f,       // Nucleus sampling. Considers tokens whose cumulative probability is within TopP (0.0 - 1.0).
                    TopK = 60,          // Top-k sampling. Considers the TopK most likely tokens (1 - infinity).
                                        // MaxOutputTokens = 800, // Optional: Maximum number of tokens to generate in the response.
                                        // ResponseMimeType = "text/plain", // Default is text/plain. Can be "application/json" for structured output.
                                        // StopSequences = new List<string> { "STOP_TOKEN" } // Optional: Strings that will stop generation if encountered.
                };

                // 5. Define Safety Settings
                // These settings allow you to configure thresholds for various harmful content categories.
                // For demonstration, we're setting them to 'BlockMediumAndAbove'.
                // Options: BlockNone, BlockLowAndAbove, BlockMediumAndAbove, BlockOnlyHigh, HarmBlockThresholdUnspecified
                var safetySettings = new List<SafetySetting>
                {
                    new SafetySetting { Category = HarmCategory.HarmCategoryHarassment, Threshold = HarmBlockThreshold.BlockMediumAndAbove },
                    new SafetySetting { Category = HarmCategory.HarmCategoryHateSpeech, Threshold = HarmBlockThreshold.BlockMediumAndAbove },
                    new SafetySetting { Category = HarmCategory.HarmCategorySexuallyExplicit, Threshold = HarmBlockThreshold.BlockMediumAndAbove },
                    new SafetySetting { Category = HarmCategory.HarmCategoryDangerousContent, Threshold = HarmBlockThreshold.BlockMediumAndAbove }
                };

                // 6.Create the content for the request
                // For text-only input, a simple string is sufficient.
                // For multi-turn chat, you would build a list of Content objects.
                //var content = new Content(Part.FromText(prompt));
                /*var content = new Content(prompt) 
                {

                };*/

                //
                GenerateContentRequest request = new GenerateContentRequest()
                {
                    Contents = new List<Content> 
                    {
                        /*new Content("You are senior frontend developer, who write html and css the best in the world!")
                        {
                            Role = Role.System,
                        },*/
                        new Content(prompt)
                        {
                            Role = Role.User,
                        }
                    },
                    GenerationConfig = generationConfig,
                };

                //GenerateContentRequest _request = new GenerateContentRequest(prompt);
                //

                // 7. Send the request to the Gemini API
                /*var response = await model.GenerateContent(
                    "asd",
                    generationConfig: generationConfig,
                    safetySettings: safetySettings
                );*/

                //model.GenerateContent(request, generationConfig: generationConfig);

                /*model.GenerateContent(
                   "prompt",
                    generationConfig: null,
                    safetySettings: null,
                    toolConfig: null,
                    requestOptions: null,
                    cancellationToken: default
                );*/

                /*model.GenerateContent(
                    parts: new List<IPart>()
                );*/

                response = await model.GenerateContent(request);

                // 8. Display the generated text
                if (response.Candidates != null && response.Candidates.Count > 0 &&
                    response.Candidates[0].Content != null && response.Candidates[0].Content.Parts != null &&
                    response.Candidates[0].Content.Parts.Count > 0)
                {
                    Console.WriteLine(response.Candidates[0].Content.Parts[0].Text);
                    _logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, response.Candidates[0].Content.Parts[0].Text);
                }
                else if (response.PromptFeedback != null && response.PromptFeedback.BlockReason != null)
                {
                    Console.WriteLine($"Content blocked due to: {response.PromptFeedback.BlockReason}. Please adjust your prompt.");
                    _logger.LogWarning($"Content blocked due to: {response.PromptFeedback.BlockReason}. Please adjust your prompt.");
                }
                else
                {
                    Console.WriteLine("No generated text found in the response or unexpected response structure.");
                    _logger.LogWarning("No generated text found in the response or unexpected response structure.");
                }

                // 9. Display the full API response object (serialized to JSON)
                // Use JsonSerializer for pretty printing the JSON.
                var options = new JsonSerializerOptions { WriteIndented = true };
                string jsonResponse = JsonSerializer.Serialize(response, options);
                Console.WriteLine(jsonResponse);
                _logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, jsonResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nAn error occurred: {ex.Message}");
                _logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, $"\nAn error occurred: {ex.Message}");
            }

            return response;
        }
    }
}
