namespace MusicApp.Server.Models
{
    public class Music
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Author { get; set; }
        public Guid AlbumId { get; set; }
        public Guid UserId { get; set; }
    }
}
