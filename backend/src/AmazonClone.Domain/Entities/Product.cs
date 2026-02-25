using System;
using System.Collections.Generic;
using AmazonClone.Domain.Common;

namespace AmazonClone.Domain.Entities
{
    public class Product : BaseEntity
    {
        public Guid SellerId { get; set; }
        public Seller? Seller { get; set; }

        public Guid CategoryId { get; set; }
        public Category? Category { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public decimal DiscountPrice { get; set; }
        public int Stock { get; set; }
        
        public bool IsApproved { get; set; } = false;

        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
