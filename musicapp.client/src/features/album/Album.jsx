import MusicList from "@/features/music/MusicList.jsx";
import AlbumToolbar from "@/features/album/AlbumToolbar.jsx";

function Album() {
    return (
        <div className="m-2">
            <AlbumToolbar/>
            <MusicList/>
        </div>
    );
}

export default Album;