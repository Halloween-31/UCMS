using System.Diagnostics;
using System.Text.Json;
using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Matching;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Identity.Client;
using Mscc.GenerativeAI;
using UCMS.AIService.ApiClient;
using static Google.Apis.Requests.BatchRequest;

namespace UCMS.AIService.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class AIController
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AIController> _logger;
        private readonly DataServiceApiClient _dataServiceApiClient;

        private readonly string apiKeyGemini;
        public AIController(IConfiguration configuration, ILogger<AIController> logger, DataServiceApiClient dataServiceApiClient)
        {
            _configuration = configuration;
            _logger = logger;
            _dataServiceApiClient = dataServiceApiClient;
            apiKeyGemini = _configuration["ApiKeyGemini"] ?? throw new NullReferenceException("ApiKeyGemini is not set in appsetting.json!");
        }

        [HttpGet]
        public async Task<ActionResult<object>> AskAI(string prompt, int ContentId)
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
                    Temperature = 0.3f, // Controls randomness. Higher values (0.0 - 1.0) mean more random outputs.
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
                UCMS.Models.DbModels.SiteContentCreation.Content? content = await _dataServiceApiClient.GetFullContentById(ContentId);
                //


                //
                List<string> props = new List<string>();
                foreach (var prop in content.DocumentType.Properties)
                {
                    props.Add($"{{{{{prop.PropertyName}}}}}");
                }

                var subprompt = "I need create a page, with next properties: " + string.Join(", ", props) + ". These are my site settings, I will change them in the text, so when you generate the html/css, change the text to these and add as potential comment text.";
                prompt = "Create page about my travel blog.";
                GenerateContentRequest request = new GenerateContentRequest()
                {
                    Contents = new List<Content> 
                    {
                        new Content("You are senior frontend developer, who write html and css the best in the world!")
                        {
                            Role = Role.User, //Role.System
                        },
                        new Content(subprompt)
                        {
                            Role = Role.User,
                        },
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
                    "",
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


                //"This code creates a simple one-page travel blog.  You'll need to replace the placeholder content with your own blog posts.  The CSS is minimal; feel free to expand it to create a more visually appealing design.  JavaScript is optional and only used here for a simple animation.\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>My Travel Blog</title>\n    <style>\n        body {\n            font-family: sans-serif;\n            margin: 0;\n            padding: 0;\n            line-height: 1.6;\n        }\n\n        header {\n            background-color: #f0f0f0;\n            padding: 20px;\n            text-align: center;\n        }\n\n        h1 {\n            margin: 0;\n        }\n\n        .post {\n            border-bottom: 1px solid #ccc;\n            padding: 20px;\n            margin-bottom: 20px;\n        }\n\n        .post img {\n            max-width: 100%;\n            height: auto;\n            margin-bottom: 10px;\n        }\n\n        .post h2 {\n            margin-top: 0;\n        }\n\n        footer {\n            background-color: #f0f0f0;\n            padding: 10px;\n            text-align: center;\n        }\n\n        /* Optional animation */\n        .animated-title {\n            animation: fadeIn 1s ease-in-out;\n        }\n\n        @keyframes fadeIn {\n            from { opacity: 0; }\n            to { opacity: 1; }\n        }\n    </style>\n</head>\n<body>\n    <header>\n        <h1 class=\"animated-title\">My Awesome Travel Blog</h1>\n    </header>\n\n    <div class=\"content\">\n        <div class=\"post\">\n            <img src=\"placeholder-image1.jpg\" alt=\"Placeholder Image 1\">\n            <h2>My Trip to Japan</h2>\n            <p>This was an amazing trip to Japan!  I visited Tokyo, Kyoto, and Osaka.  The food was incredible, the culture was fascinating, and the people were so friendly. I highly recommend visiting!</p>\n            <a href=\"#\">Read More</a>\n        </div>\n\n        <div class=\"post\">\n            <img src=\"placeholder-image2.jpg\" alt=\"Placeholder Image 2\">\n            <h2>Exploring the Amazon Rainforest</h2>\n            <p>My adventure in the Amazon was unlike anything I've ever experienced.  The biodiversity is breathtaking, and the sounds of the jungle at night are unforgettable.  I learned so much about the local flora and fauna.</p>\n            <a href=\"#\">Read More</a>\n        </div>\n\n        <!-- Add more posts here -->\n    </div>\n\n    <footer>\n        <p>&copy; 2023 My Travel Blog</p>\n    </footer>\n\n    <!-- Replace placeholder images with your own -->\n    <script>\n      //This is a very basic example.  You would normally fetch data from a server-side API\n      //or use a more sophisticated JavaScript framework for a real-world application.\n    </script>\n</body>\n</html>\n```\n\nRemember to replace `\"placeholder-image1.jpg\"` and `\"placeholder-image2.jpg\"` with actual image file paths or URLs.  You should also add more `<div class=\"post\">` sections with your own blog post content.  To make this a fully functional blog, you'd need a backend (like Node.js, Python/Flask/Django, etc.) to handle storing and retrieving blog posts from a database.  This example is a basic front-end only.\n"
                return new GenerateContentResponse()
                {
                    Candidates = [
                        new Candidate()
                        {
                            Content = new ContentResponse("```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>{{Title}} - My Travel Blog</title> <!--  Change this to your blog's title -->\n    <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n    <header>\n        <h1>{{Title}}</h1> <!--  Change this to your blog's title -->\n        <p>{{Subtitle}}</p> <!-- Change this to your blog's subtitle -->\n    </header>\n\n    <main>\n        <section id=\"main-content\">\n            {{MainPart}} <!--  Replace this with your main blog content -->\n        </section>\n\n        <aside>\n            <h3>{{AdditionalData}}</h3> <!-- Replace this with additional information, like recent posts, about me, etc. -->\n        </aside>\n    </main>\n\n    <footer>\n        <p>&copy; 2023 My Travel Blog</p>\n    </footer>\n</body>\n</html>\n```\n\n```css\n/* style.css */\nbody {\n    font-family: sans-serif;\n    margin: 0;\n    padding: 0;\n    line-height: 1.6;\n    background-color: #f4f4f4; /* Light gray background */\n    color: #333; /* Dark gray text */\n}\n\nheader {\n    background-color: #333; /* Dark gray header */\n    color: white;\n    padding: 20px;\n    text-align: center;\n}\n\nh1 {\n    margin-top: 0;\n}\n\nmain {\n    display: flex;\n    flex-wrap: wrap;\n    padding: 20px;\n}\n\n#main-content {\n    flex: 1 1 60%; /* Main content takes up 60% of the width */\n    padding-right: 20px;\n}\n\naside {\n    flex: 1 1 40%; /* Aside takes up 40% of the width */\n    background-color: white;\n    padding: 20px;\n    border-radius: 5px;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */\n}\n\nfooter {\n    background-color: #333;\n    color: white;\n    text-align: center;\n    padding: 10px;\n}\n\n/* Responsive design adjustments */\n@media (max-width: 768px) {\n    main {\n        flex-direction: column; /* Stack main content and aside vertically on smaller screens */\n    }\n    #main-content {\n        padding-right: 0; /* Remove padding on smaller screens */\n        width: 100%;\n    }\n    aside {\n        width: 100%;\n        margin-top: 20px;\n    }\n}\n```\n\nRemember to replace the `{{...}}` placeholders with your actual content.  This provides a clean, responsive layout that adapts well to different screen sizes.  The CSS is designed for readability and maintainability.  You can easily customize colors and fonts to match your branding.\n")
                            {
                                Parts = [
                                    new Part() {
                                        Text = "```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>{{Title}} - My Travel Blog</title> <!--  Change this to your blog's title -->\n    <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n    <header>\n        <h1>{{Title}}</h1> <!--  Change this to your blog's title -->\n        <p>{{Subtitle}}</p> <!-- Change this to your blog's subtitle -->\n    </header>\n\n    <main>\n        <section id=\"main-content\">\n            {{MainPart}} <!--  Replace this with your main blog content -->\n        </section>\n\n        <aside>\n            <h3>{{AdditionalData}}</h3> <!-- Replace this with additional information, like recent posts, about me, etc. -->\n        </aside>\n    </main>\n\n    <footer>\n        <p>&copy; 2023 My Travel Blog</p>\n    </footer>\n</body>\n</html>\n```\n\n```css\n/* style.css */\nbody {\n    font-family: sans-serif;\n    margin: 0;\n    padding: 0;\n    line-height: 1.6;\n    background-color: #f4f4f4; /* Light gray background */\n    color: #333; /* Dark gray text */\n}\n\nheader {\n    background-color: #333; /* Dark gray header */\n    color: white;\n    padding: 20px;\n    text-align: center;\n}\n\nh1 {\n    margin-top: 0;\n}\n\nmain {\n    display: flex;\n    flex-wrap: wrap;\n    padding: 20px;\n}\n\n#main-content {\n    flex: 1 1 60%; /* Main content takes up 60% of the width */\n    padding-right: 20px;\n}\n\naside {\n    flex: 1 1 40%; /* Aside takes up 40% of the width */\n    background-color: white;\n    padding: 20px;\n    border-radius: 5px;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */\n}\n\nfooter {\n    background-color: #333;\n    color: white;\n    text-align: center;\n    padding: 10px;\n}\n\n/* Responsive design adjustments */\n@media (max-width: 768px) {\n    main {\n        flex-direction: column; /* Stack main content and aside vertically on smaller screens */\n    }\n    #main-content {\n        padding-right: 0; /* Remove padding on smaller screens */\n        width: 100%;\n    }\n    aside {\n        width: 100%;\n        margin-top: 20px;\n    }\n}\n```\n\nRemember to replace the `{{...}}` placeholders with your actual content.  This provides a clean, responsive layout that adapts well to different screen sizes.  The CSS is designed for readability and maintainability.  You can easily customize colors and fonts to match your branding.\n",
                                        InlineData = null,
                                        FileData = null,
                                        FunctionResponse = null,
                                        FunctionCall =  null,
                                        VideoMetadata = null,
                                        ExecutableCode = null,
                                        CodeExecutionResult = null,
                                        Thought = null,
                                        ETag = null
                                    }
                                ],
                                Role = "model"
                            },
                            FinishReason = FinishReason.Stop,
                            FinishMessage = null,
                            Index = null,
                            SafetyRatings = null,
                            CitationMetadata = new CitationMetadata()
                            {
                                //Citations = null
                            },
                            FunctionCall = null,
                            GroundingMetadata= null,
                            TokenCount = null,
                            GroundingAttributions = null,
                            AvgLogprobs = -0.1346224f,
                            LogprobsResult = null,
                            UrlRetrievalMetadata = null,
                            UrlContextMetadata = null
                        }
                      ],
                    PromptFeedback = null,
                    UsageMetadata = new UsageMetadata {
                        PromptTokenCount = 83,
                        CandidatesTokenCount = 772,
                        TotalTokenCount = 885,
                        TextCount = 0,
                        ImageCount = 0,
                        VideoDurationSeconds = 0,
                        AudioDurationSeconds = 0,
                        CachedContentTokenCount = 0,
                        ToolUsePromptTokenCount = 0,
                        ThoughtsTokenCount = 0,
                        PromptTokensDetails = [
                            new ModalityTokenCount ()
                            {
                                Modality = Modality.Text,
                                TokenCount = 83
                            }
                        ],
                        CandidatesTokensDetails = [
                            new ModalityTokenCount()
                            {
                                Modality = Modality.Text,
                                TokenCount = 772
                            }
                        ],
                        CacheTokensDetails = null,
                        ToolUsePromptTokensDetails = null
                    },
                    ModelVersion = "gemini-1.5-flash",
                    ResponseId = "w7k3aP30BOqFm9IPuo_CkAg"
                };

                //response = await model.GenerateContent(request);

                // 8. Display the generated text
                /*if (response.Candidates != null && response.Candidates.Count > 0 &&
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
                _logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, jsonResponse);*/
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
