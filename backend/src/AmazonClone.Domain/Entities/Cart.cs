using System;
using System.Collections.Generic;
using AmazonClone.Domain.Common;

namespace AmazonClone.Domain.Entities
{
    public class Cart : BaseEntity
    {
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
    }

    public class CartItem : BaseEntity
    {
        public Guid CartId { get; set; }
        public Cart? Cart { get; set; }

        public Guid ProductId { get; set; }
        public Product? Product { get; set; }

        public Guid? VariantId { get; set; }
        public ProductVariant? Variant { get; set; }

        public int Quantity { get; set; }
    }
}
