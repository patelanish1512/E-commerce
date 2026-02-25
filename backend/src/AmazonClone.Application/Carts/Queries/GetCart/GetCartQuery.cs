using System;
using AmazonClone.Application.Dtos;
using MediatR;

namespace AmazonClone.Application.Carts.Queries.GetCart
{
    public class GetCartQuery : IRequest<CartDto?>
    {
        public Guid UserId { get; set; }
    }
}
