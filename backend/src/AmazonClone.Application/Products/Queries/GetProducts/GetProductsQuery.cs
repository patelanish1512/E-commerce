using System.Collections.Generic;
using AmazonClone.Application.Dtos;
using MediatR;

namespace AmazonClone.Application.Products.Queries.GetProducts
{
    public class GetProductsQuery : IRequest<List<ProductDto>>
    {
        public string? SearchTerm { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
