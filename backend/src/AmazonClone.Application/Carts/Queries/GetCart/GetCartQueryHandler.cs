using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AmazonClone.Application.Dtos;
using AmazonClone.Domain.Entities;
using AmazonClone.Domain.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AmazonClone.Application.Carts.Queries.GetCart
{
    public class GetCartQueryHandler : IRequestHandler<GetCartQuery, CartDto?>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCartQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CartDto?> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            // Note: Since generic repo is hard to use for Includes, we are fetching items manually
            var carts = await _unitOfWork.Repository<Cart>().FindAsync(c => c.UserId == request.UserId);
            var cart = carts.FirstOrDefault();

            if (cart == null) return null;

            var cartItems = await _unitOfWork.Repository<CartItem>().FindAsync(ci => ci.CartId == cart.Id);
            var itemsList = cartItems.ToList();

            var dto = new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                Items = new List<CartItemDto>()
            };

            foreach (var item in itemsList)
            {
                var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
                if (product != null)
                {
                    dto.Items.Add(new CartItemDto
                    {
                        Id = item.Id,
                        ProductId = product.Id,
                        ProductName = product.Name,
                        Quantity = item.Quantity,
                        UnitPrice = product.DiscountPrice > 0 ? product.DiscountPrice : product.BasePrice,
                        // Note: Image URL requires Product Image query in reality. Keeping empty for simplicity unless queried.
                    });
                }
            }

            dto.TotalPrice = dto.Items.Sum(i => i.TotalPrice);
            return dto;
        }
    }
}
