import AlbumList from "@/features/album/AlbumList.jsx";
import Album from "@/features/album/Album.jsx";
import AddAlbumButton from "@/features/album/AddAlbumButton.jsx";

function AlbumsPage() {
    return (
        <>
            <section className="flex gap-4">
                <div className="w-1/6 m-2">
                    <AddAlbumButton/>
                    <AlbumList/>
                </div>
                <div className="w-5/6">
                    <Album/>
                </div>
            </section>
        </>
    );
}

export default AlbumsPage;