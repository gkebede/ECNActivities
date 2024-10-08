namespace Infrastructure.Photos
{
    public class CloudinarySettings
    {
        public string CloudName { get; set; } 
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }  
    }
}

//! CloudinarySettings ~~initialized AS FOLLOW ~~ 
//! services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));