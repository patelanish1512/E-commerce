using System;
using AmazonClone.Domain.Common;

namespace AmazonClone.Domain.Entities
{
    public class ProductVariant : BaseEntity
    {
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }

        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        
        public decimal AdditionalPrice { get; set; }
        public int Stock { get; set; }
    }
}
