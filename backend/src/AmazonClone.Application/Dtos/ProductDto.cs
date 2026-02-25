using System;
using System.Collections.Generic;

namespace AmazonClone.Application.Dtos
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public decimal DiscountPrice { get; set; }
        public int Stock { get; set; }
        
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;

        public Guid SellerId { get; set; }
        public string SellerName { get; set; } = string.Empty;

        public List<ProductImageDto> Images { get; set; } = new();
    }

    public class ProductImageDto
    {
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; }
    }
}
