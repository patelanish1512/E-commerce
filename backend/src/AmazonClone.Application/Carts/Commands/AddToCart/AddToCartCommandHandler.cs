using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AmazonClone.Application.Common.Models;
using AmazonClone.Domain.Entities;
using AmazonClone.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AmazonClone.Application.Carts.Commands.AddToCart
{
    public class AddToCartCommandHandler : IRequestHandler<AddToCartCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddToCartCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(AddToCartCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var product = await _unitOfWork.Repository<Product>().GetByIdAsync(request.ProductId);
                if (product == null)
                {
                    return Result.Failure(new[] { "Product not found." });
                }

                if (product.Stock < request.Quantity)
                {
                    return Result.Failure(new[] { "Insufficient stock available." });
                }

                var carts = await _unitOfWork.Repository<Cart>().FindAsync(c => c.UserId == request.UserId);
                var cart = carts.FirstOrDefault();

                if (cart == null)
                {
                    cart = new Cart { UserId = request.UserId };
                    await _unitOfWork.Repository<Cart>().AddAsync(cart);
                    await _unitOfWork.CompleteAsync(cancellationToken);
                }

                // Actually we need CartItems which requires an explicit query or eager loading. 
                // For a robust implementation, a custom CartRepository should be used.
                // Assuming CartItems are loaded or we query them directly:
                var cartItems = await _unitOfWork.Repository<CartItem>().FindAsync(ci => ci.CartId == cart.Id);
                var existingItem = cartItems.FirstOrDefault(ci => ci.ProductId == request.ProductId && ci.VariantId == request.VariantId);

                if (existingItem != null)
                {
                    existingItem.Quantity += request.Quantity;
                    _unitOfWork.Repository<CartItem>().Update(existingItem);
                }
                else
                {
                    var newItem = new CartItem
                    {
                        CartId = cart.Id,
                        ProductId = request.ProductId,
                        VariantId = request.VariantId,
                        Quantity = request.Quantity
                    };
                    await _unitOfWork.Repository<CartItem>().AddAsync(newItem);
                }

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
