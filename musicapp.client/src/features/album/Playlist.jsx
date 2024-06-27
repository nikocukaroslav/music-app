import MusicList from "@/features/music/MusicList.jsx";
import {useSelector} from "react-redux";
import MusicToolbar from "@/features/music/MusicToolbar.jsx";

function Playlist() {
    const albumIsActive = useSelector(state => state.album.activeAlbum);

    return (
        <div className="m-2 h-full">
            {
                albumIsActive ?
                    <>
                        <MusicToolbar albumToolsActive={true}/>
                        <MusicList/>
                    </>
                    :
                    <p className="w-full flex  justify-center items-center h-[80dvh]  text-2xl">Choose album to play</p>
            }
        </div>
    );
}

export default Playlist;