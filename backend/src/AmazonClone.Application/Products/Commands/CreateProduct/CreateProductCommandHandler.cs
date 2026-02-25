using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AmazonClone.Application.Common.Models;
using AmazonClone.Domain.Entities;
using AmazonClone.Domain.Interfaces;
using MediatR;

namespace AmazonClone.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateProductCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var seller = await _unitOfWork.Repository<Seller>().GetByIdAsync(request.SellerId);
                if (seller == null || !seller.IsApproved)
                {
                    return Result.Failure(new[] { "Seller not found or not approved." });
                }

                var product = new Product
                {
                    SellerId = request.SellerId,
                    CategoryId = request.CategoryId,
                    Name = request.Name,
                    Description = request.Description,
                    BasePrice = request.BasePrice,
                    DiscountPrice = request.BasePrice,
                    Stock = request.Stock,
                    IsApproved = false // Pending admin approval
                };

                // Add Images
                if (request.ImageUrls.Any())
                {
                    for (int i = 0; i < request.ImageUrls.Count; i++)
                    {
                        product.Images.Add(new ProductImage
                        {
                            ImageUrl = request.ImageUrls[i],
                            IsPrimary = i == 0
                        });
                    }
                }

                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.CompleteAsync(cancellationToken);

                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(new[] { ex.Message });
            }
        }
    }
}
