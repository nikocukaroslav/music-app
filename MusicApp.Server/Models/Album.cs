namespace MusicApp.Server.Models
{
    public class Album
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? UserId { get; set; }
        public List<Music> Musics { get; set; }
    }
}
