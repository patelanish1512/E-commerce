using System;
using System.Collections.Generic;
using AmazonClone.Application.Common.Models;
using MediatR;

namespace AmazonClone.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<Result>
    {
        public Guid SellerId { get; set; }
        public Guid CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public int Stock { get; set; }
        public List<string> ImageUrls { get; set; } = new();
    }
}
