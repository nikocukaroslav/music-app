import MusicList from "@/features/music/MusicList.jsx";
import AlbumToolbar from "@/features/album/AlbumToolbar.jsx";
import {useSelector} from "react-redux";

function Album() {
    const albumIsActive = useSelector(state => state.album.activeAlbum);

    return (
        <div className="m-2">
            {
                albumIsActive ?
                    <>
                        <AlbumToolbar/>
                        <MusicList/>
                    </>
                    :
                    <p className="w-full h-full flex  justify-center  text-2xl">Choose album to play</p>
            }
        </div>
    );
}

export default Album;