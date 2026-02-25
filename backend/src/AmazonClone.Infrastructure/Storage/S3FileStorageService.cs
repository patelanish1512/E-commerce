using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Transfer;
using AmazonClone.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace AmazonClone.Infrastructure.Storage
{
    public class S3FileStorageService : IFileStorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3FileStorageService(IConfiguration configuration, IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"] ?? "amazonclone-assets";
        }

        public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
        {
            var fileTransferUtility = new TransferUtility(_s3Client);
            var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = fileStream,
                Key = uniqueFileName,
                BucketName = _bucketName,
                ContentType = contentType
            };

            await fileTransferUtility.UploadAsync(uploadRequest);

            // Construct public URL
            var url = $"https://{_bucketName}.s3.amazonaws.com/{uniqueFileName}";
            return url;
        }

        public async Task DeleteFileAsync(string fileUrl)
        {
            if (string.IsNullOrEmpty(fileUrl)) return;

            var uri = new Uri(fileUrl);
            var key = Path.GetFileName(uri.LocalPath);

            await _s3Client.DeleteObjectAsync(_bucketName, key);
        }
    }
}
