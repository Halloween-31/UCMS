namespace UCMS.DataService.DTOs.CodeDTOs
{
    public class CodeSaveDTO
    {
        public int CodeId { get; set; }
        public string CodeValue { get; set; } = string.Empty;

        public int DocumentTypeId { get; set; }
    }
}
