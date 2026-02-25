using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using AmazonClone.Application.Dtos;
using AmazonClone.Domain.Entities;
using AmazonClone.Domain.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace AmazonClone.Application.Products.Queries.GetProducts
{
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<ProductDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;

        public GetProductsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper, IDistributedCache cache)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<List<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var cacheKey = $"ProductsList_{request.CategoryId}_{request.SearchTerm}";
            
            var cachedData = await _cache.GetStringAsync(cacheKey, cancellationToken);
            if (!string.IsNullOrEmpty(cachedData))
            {
                var cachedProducts = JsonSerializer.Deserialize<List<ProductDto>>(cachedData);
                if (cachedProducts != null)
                    return cachedProducts;
            }

            var allProducts = await _unitOfWork.Repository<Product>().GetAllAsync();
            var query = allProducts.AsQueryable();

            if (request.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == request.CategoryId.Value);
            }

            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                var lowerDesc = request.SearchTerm.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(lowerDesc) || p.Description.ToLower().Contains(lowerDesc));
            }

            var products = query.ToList();
            var dtos = _mapper.Map<List<ProductDto>>(products);

            var options = new DistributedCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(10))
                .SetAbsoluteExpiration(TimeSpan.FromHours(1));

            await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(dtos), options, cancellationToken);

            return dtos;
        }
    }
}
