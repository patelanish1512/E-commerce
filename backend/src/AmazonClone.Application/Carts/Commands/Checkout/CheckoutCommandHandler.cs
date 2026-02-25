using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AmazonClone.Application.Common.Models;
using AmazonClone.Domain.Entities;
using AmazonClone.Domain.Interfaces;
using MediatR;

namespace AmazonClone.Application.Carts.Commands.Checkout
{
    public class CheckoutCommandHandler : IRequestHandler<CheckoutCommand, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        // Note: For Clean Architecture, SignalR Hub Context should be abstracted behind an INotificationService
        // But for brevity, we can assume this handler triggers a domain event or we just use it if we map it correctly.
        // We will omit SignalR direct injection here to keep layering clean, and assume a separate service or event fires it later.

        public CheckoutCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CheckoutCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var carts = await _unitOfWork.Repository<Cart>().FindAsync(c => c.UserId == request.UserId);
                var cart = carts.FirstOrDefault();

                if (cart == null) return Result.Failure(new[] { "Cart is empty." });

                var cartItems = await _unitOfWork.Repository<CartItem>().FindAsync(ci => ci.CartId == cart.Id);
                var itemsList = cartItems.ToList();

                if (!itemsList.Any()) return Result.Failure(new[] { "Cart is empty." });

                decimal totalAmount = 0;
                var order = new Order
                {
                    UserId = request.UserId,
                    ShippingAddressId = request.ShippingAddressId,
                    PaymentMethod = request.PaymentMethod,
                    Status = OrderStatus.Pending,
                    PaymentStatus = request.PaymentMethod == "COD" ? PaymentStatus.Pending : PaymentStatus.Completed
                };

                await _unitOfWork.Repository<Order>().AddAsync(order);

                foreach (var item in itemsList)
                {
                    var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
                    if (product == null) continue;

                    if (product.Stock < item.Quantity)
                    {
                        return Result.Failure(new[] { $"Insufficient stock for {product.Name}." });
                    }

                    product.Stock -= item.Quantity;
                    _unitOfWork.Repository<Product>().Update(product);

                    var price = product.DiscountPrice > 0 ? product.DiscountPrice : product.BasePrice;
                    totalAmount += price * item.Quantity;

                    var orderItem = new OrderItem
                    {
                        OrderId = order.Id,
                        ProductId = product.Id,
                        VariantId = item.VariantId,
                        Quantity = item.Quantity,
                        UnitPrice = price
                    };

                    await _unitOfWork.Repository<OrderItem>().AddAsync(orderItem);
                    _unitOfWork.Repository<CartItem>().Delete(item);
                }

                order.TotalAmount = totalAmount;

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
