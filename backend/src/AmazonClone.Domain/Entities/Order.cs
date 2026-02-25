using System;
using System.Collections.Generic;
using AmazonClone.Domain.Common;

namespace AmazonClone.Domain.Entities
{
    public class Order : BaseEntity
    {
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public Guid ShippingAddressId { get; set; }
        public Address? ShippingAddress { get; set; }

        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        public string PaymentMethod { get; set; } = string.Empty; // "Card", "COD"
        public string PaymentId { get; set; } = string.Empty; // Stripe/Razorpay receipt
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }

    public enum OrderStatus
    {
        Pending,
        Confirmed,
        Shipped,
        OutForDelivery,
        Delivered,
        Cancelled
    }

    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed,
        Refunded
    }
}
