using System;
using AmazonClone.Application.Common.Models;
using MediatR;

namespace AmazonClone.Application.Carts.Commands.Checkout
{
    public class CheckoutCommand : IRequest<Result>
    {
        public Guid UserId { get; set; }
        public Guid ShippingAddressId { get; set; }
        public string PaymentMethod { get; set; } = string.Empty; // "Card", "COD"
    }
}
