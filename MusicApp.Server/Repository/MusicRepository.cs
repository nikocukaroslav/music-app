using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http.HttpResults;
using MusicApp.Server.Models;
using MusicApp.Server.Repository.Interfaces;
using Save__plan_your_trips.Data;

namespace MusicApp.Server.Repository;

public class MusicRepository : IMusicRepository
{
    private readonly IConfiguration configuration;
    private readonly MusicAppDbContext _context;
    private readonly Account account;

    public MusicRepository(IConfiguration configuration, MusicAppDbContext musicAppDbContext)
    {
        this.configuration = configuration;
        account = new Account("dbamhuz47", "495485613653551", "QxRvJNMAi87kw2jqlIZfBbp_Rh4");
        _context = musicAppDbContext;
    }

    public async Task<string> UploadMusic(IFormFile file)
    {
        var client = new Cloudinary(account);

        var uploadParams = new VideoUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            DisplayName = file.FileName,
        };

        var uploadResult = await client.UploadAsync(uploadParams);
        var musicUrl = uploadResult.SecureUri.ToString();

        var newMusic = new Music
        {
            Id = Guid.NewGuid(),
            Name = file.FileName,
            Url = musicUrl,
        };

        _context.Add(newMusic);
        await _context.SaveChangesAsync();

        return musicUrl;
    }

    public async Task DeleteMusic(Guid id)
    {
        var client = new Cloudinary(account);
        var music = await _context.Musics.FindAsync(id);

        if (music == null)
        {
            throw new Exception("Music not found");
        }

        var musicUrl = music.Url;
        var urlSlice = musicUrl.Split("/");
        var fileName = urlSlice[urlSlice.Length - 1];
        var musicToDelete = fileName.Split(".")[0];


        Console.Write(musicToDelete);

        var destroyParams = new DeletionParams(musicToDelete)
        {
            ResourceType = ResourceType.Video,
        };

        var result = await client.DestroyAsync(destroyParams);

        if (result.Result == "ok")
        {
            _context.Musics.Remove(music);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Can't delete music from cloudinary");
        }
    }

}

