using System;
using System.Collections.Generic;
using AmazonClone.Domain.Common;
using Microsoft.AspNetCore.Identity;

namespace AmazonClone.Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // "User", "Seller", "Admin"
        
        public ICollection<Address> Addresses { get; set; } = new List<Address>();
        public Seller? SellerProfile { get; set; }
        public Cart? Cart { get; set; }
        public Wishlist? Wishlist { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
