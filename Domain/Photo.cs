namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }  //! the public ID that we get back from Cloudinary
        public string Url { get; set; }
        public bool IsMain { get; set; } //! So is this the user's main photo from Cloudinary?
    }
}