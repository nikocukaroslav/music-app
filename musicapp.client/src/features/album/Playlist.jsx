import MusicList from "@/features/music/MusicList.jsx";
import {useSelector} from "react-redux";
import MusicToolbar from "@/features/music/MusicToolbar.jsx";
import {useParams} from "react-router-dom";
import AddMusicButton from "@/features/album/AddMusicButton.jsx";

function Playlist() {
    const {id} = useParams();

    const albumIsActive = useSelector(state => state.album.activeAlbum);

    const music = useSelector(state => state.music.music);

    return (
        <div className="m-2 h-full">
            {
                (albumIsActive && id) ?
                    <>
                        {
                            music.length > 0 ? (
                                    <>
                                        <MusicToolbar albumToolsActive={true}/>
                                        <MusicList/>
                                    </>
                                )
                                :
                                <div className="flex items-center justify-end gap-5">
                                    <p className="text-xl"> Add music first </p>
                                    <AddMusicButton/>
                                </div>
                        }
                    </>
                    :
                    <p className="w-full flex justify-center items-center h-[80dvh]  text-2xl">Choose album to play</p>
            }
        </div>
    );
}

export default Playlist;