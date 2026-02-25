using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AmazonClone.Application.Carts.Commands.AddToCart;
using AmazonClone.Application.Carts.Commands.Checkout;
using AmazonClone.Application.Carts.Queries.GetCart;
using AmazonClone.Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazonClone.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

            var query = new GetCartQuery { UserId = userId };
            var result = await _mediator.Send(query);

            return Ok(result ?? new CartDto { UserId = userId });
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddToCart([FromBody] AddToCartDto request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

            var command = new AddToCartCommand
            {
                UserId = userId,
                ProductId = request.ProductId,
                VariantId = request.VariantId,
                Quantity = request.Quantity
            };

            var result = await _mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("checkout")]
        public async Task<ActionResult> Checkout([FromBody] CheckoutRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

            var command = new CheckoutCommand
            {
                UserId = userId,
                ShippingAddressId = request.ShippingAddressId,
                PaymentMethod = request.PaymentMethod
            };

            var result = await _mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }
    }

    public class AddToCartDto
    {
        public Guid ProductId { get; set; }
        public Guid? VariantId { get; set; }
        public int Quantity { get; set; }
    }

    public class CheckoutRequest
    {
        public Guid ShippingAddressId { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
    }
}
