export interface GigiGenerateContentResponse {
    /*
    public List<Candidate>? Candidates { get; set; }
    /// <summary>
    /// Output only. Content filter results for a prompt sent in the request.
    /// Note: Sent only in the first stream chunk.
    /// Only happens when no candidates were generated due to content violations.
    /// </summary>
    public PromptFeedback? PromptFeedback { get; set; }
    /// <summary>
    /// Usage metadata about the response(s).
    /// </summary>
    public UsageMetadata? UsageMetadata { get; set; }
    /// <summary>
    /// Output only. The model version used to generate the response.
    /// </summary>
    public string? ModelVersion { get; set; }
    /// <summary>
    /// Output only. response_id is used to identify each response.
    /// </summary>
    public string? ResponseId { get; set; }

    public string? Text
    {
        get
        {
            if (Candidates is null) return string.Empty;
            if (Candidates?.Count == 0) return string.Empty;
            if (Candidates?.FirstOrDefault()?.FinishReason is
                FinishReason.MaxTokens or
                FinishReason.Safety or
                FinishReason.Recitation or
                FinishReason.Other)
                return string.Empty;
            if (Candidates?.Count > 1) Logger.LogMultipleCandidates(Candidates!.Count);

            return Candidates?.FirstOrDefault()?.Content?.Parts.FirstOrDefault()?.Text;
        }
    }
    */
};