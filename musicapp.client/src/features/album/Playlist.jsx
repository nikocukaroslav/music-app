import MusicList from "@/features/music/MusicList.jsx";
import {useSelector} from "react-redux";
import MusicToolbar from "@/features/music/MusicToolbar.jsx";
import {useParams} from "react-router-dom";
import AddMusicButton from "@/features/album/AddMusicButton.jsx";
import {$AddMusicFirst, $ChooseAlbum} from "@/features/settings/language.js";

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
                                    <p className="text-xl">{$AddMusicFirst}</p>
                                    <AddMusicButton/>
                                </div>
                        }
                    </>
                    :
                    <p className="w-full flex justify-center items-center h-[80dvh] text-2xl">{$ChooseAlbum}</p>
            }
        </div>
    );
}

export default Playlist;