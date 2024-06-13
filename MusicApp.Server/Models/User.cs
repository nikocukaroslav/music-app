namespace MusicApp.Server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public List<Album> Albums { get; set; }
        public List<Music> Musics { get; set; }
    }
}
