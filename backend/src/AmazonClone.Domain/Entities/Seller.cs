using System;
using System.Collections.Generic;
using AmazonClone.Domain.Common;

namespace AmazonClone.Domain.Entities
{
    public class Seller : BaseEntity
    {
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public string StoreName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsApproved { get; set; } = false;
        public decimal Balance { get; set; } = 0;

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
