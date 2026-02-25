using System;
using AmazonClone.Application.Common.Models;
using MediatR;

namespace AmazonClone.Application.Carts.Commands.AddToCart
{
    public class AddToCartCommand : IRequest<Result>
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public Guid? VariantId { get; set; }
        public int Quantity { get; set; }
    }
}
