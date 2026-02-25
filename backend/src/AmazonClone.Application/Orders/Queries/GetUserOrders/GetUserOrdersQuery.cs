using System;
using System.Collections.Generic;
using AmazonClone.Application.Dtos;
using MediatR;

namespace AmazonClone.Application.Orders.Queries.GetUserOrders
{
    public class GetUserOrdersQuery : IRequest<List<OrderDto>>
    {
        public Guid UserId { get; set; }
    }
}
