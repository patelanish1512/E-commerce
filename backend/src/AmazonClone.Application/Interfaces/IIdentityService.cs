using AmazonClone.Application.Common.Models;

namespace AmazonClone.Application.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthResponse> LoginAsync(string email, string password);
        Task<AuthResponse> RegisterAsync(string email, string password, string firstName, string lastName);
    }
}
