using System;
using AmazonClone.Domain.Common;

namespace AmazonClone.Domain.Entities
{
    public class Review : BaseEntity
    {
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }

        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public int Rating { get; set; } // 1-5
        public string Comment { get; set; } = string.Empty;
        public bool IsApproved { get; set; } = true;
    }

    public class WithdrawRequest : BaseEntity
    {
        public Guid SellerId { get; set; }
        public Seller? Seller { get; set; }

        public decimal Amount { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    }

    public class Notification : BaseEntity
    {
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
    }

    public class Coupon : BaseEntity
    {
        public string Code { get; set; } = string.Empty;
        public decimal DiscountPercentage { get; set; }
        public decimal MaxDiscountAmount { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
