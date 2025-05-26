using AutoMapper;
using UCMS.DataService.DTOs.CodeDTOs;
using UCMS.DataService.DTOs.ContentDTOs;
using UCMS.DataService.DTOs.ContentPropertyDTOs;
using UCMS.DataService.DTOs.DocumentTypeDTO;
using UCMS.DataService.DTOs.PropertyDTOs;
using UCMS.DataService.DTOs.SiteDTOs;
using UCMS.Models.DbModels;

namespace UCMS.DataService.UCSMAutoMapper
{
    public class UCSMAutoMapper : Profile
    {
        public UCSMAutoMapper() 
        {
            AllowNullCollections = true;

            CreateMap<Site, SiteSaveDTO>().ReverseMap();

            CreateMap<DocumentType, DocumentTypeSaveDTO>().ReverseMap();

            CreateMap<Content, ContentSaveDTO>().ReverseMap();

            CreateMap<Property, PropertySaveDTO>().ReverseMap();

            CreateMap<ContentProperty, ContentPropertySaveDTO>().ReverseMap();

            CreateMap<Code, CodeSaveDTO>().ReverseMap();
        }
    }
}
