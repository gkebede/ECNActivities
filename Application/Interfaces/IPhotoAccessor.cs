using Application.Photos;
using Domain;

//using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
       Task<PhotoUploadResult> AddPhoto(IFormFile file);
        //Task<Photo> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}

