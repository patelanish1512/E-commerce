using System;
using System.Threading;
using System.Threading.Tasks;

namespace AmazonClone.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<T> Repository<T>() where T : class;
        Task<int> CompleteAsync(CancellationToken cancellationToken = default);
    }
}
