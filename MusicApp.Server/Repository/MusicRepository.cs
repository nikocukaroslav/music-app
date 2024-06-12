using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MusicApp.Server.Repository.Interfaces;

namespace MusicApp.Server.Repository;

public class MusicRepository : IMusicRepository
{
    private readonly IConfiguration configuration;
    private readonly Account account;

    public MusicRepository(IConfiguration configuration)
    {
        this.configuration = configuration;
        account = new Account("dbamhuz47", "495485613653551", "QxRvJNMAi87kw2jqlIZfBbp_Rh4");
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

        return uploadResult.SecureUri.ToString();
    }

}

