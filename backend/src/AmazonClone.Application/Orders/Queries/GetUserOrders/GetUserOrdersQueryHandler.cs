using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AmazonClone.Application.Dtos;
using AmazonClone.Domain.Entities;
using AmazonClone.Domain.Interfaces;
using AutoMapper;
using MediatR;

namespace AmazonClone.Application.Orders.Queries.GetUserOrders
{
    public class GetUserOrdersQueryHandler : IRequestHandler<GetUserOrdersQuery, List<OrderDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetUserOrdersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<OrderDto>> Handle(GetUserOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _unitOfWork.Repository<Order>().FindAsync(o => o.UserId == request.UserId);
            var ordersList = orders.OrderByDescending(o => o.CreatedAt).ToList();

            var dtos = new List<OrderDto>();
            foreach (var order in ordersList)
            {
                var dto = new OrderDto
                {
                    Id = order.Id,
                    UserId = order.UserId,
                    TotalAmount = order.TotalAmount,
                    Status = order.Status.ToString(),
                    PaymentStatus = order.PaymentStatus.ToString(),
                    PaymentMethod = order.PaymentMethod,
                    CreatedAt = order.CreatedAt,
                    Items = new List<OrderItemDto>()
                };

                var items = await _unitOfWork.Repository<OrderItem>().FindAsync(oi => oi.OrderId == order.Id);
                foreach (var item in items)
                {
                    var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
                    dto.Items.Add(new OrderItemDto
                    {
                        Id = item.Id,
                        ProductId = item.ProductId,
                        ProductName = product?.Name ?? "Unknown Product",
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    });
                }
                dtos.Add(dto);
            }

            return dtos;
        }
    }
}
