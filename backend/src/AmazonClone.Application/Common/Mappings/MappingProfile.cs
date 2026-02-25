using AmazonClone.Application.Dtos;
using AmazonClone.Domain.Entities;
using AutoMapper;

namespace AmazonClone.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category != null ? s.Category.Name : string.Empty))
                .ForMember(d => d.SellerName, opt => opt.MapFrom(s => s.Seller != null ? s.Seller.StoreName : string.Empty));
                
            CreateMap<ProductImage, ProductImageDto>();
        }
    }
}
