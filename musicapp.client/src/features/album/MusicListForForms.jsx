import Song from "@/features/music/Song.jsx";
import {useDispatch, useSelector} from "react-redux";
import {handleIsMusicInList} from "@/features/album/albumSlice.js";
import {useEffect} from "react";
import {translation} from "@/features/settings/language.js";

function MusicListForForms({
                               className = "mb-24 mt-4",
                               songStyles,
                               logoStyles,
                               albumCreating,
                               filter = false,
                               filteredMusic = false,
                           }) {
    const allMusic = useSelector(state => state.music.allMusic);
    const activeAlbum = useSelector(state => state.album.activeAlbum);

    const dispatch = useDispatch();

    const musicList = filter ? allMusic.filter(song => !activeAlbum.musicList.includes(song.id))
        :
        filteredMusic ?
            filteredMusic :
            allMusic


    useEffect(() => {
        const isMusicInList = musicList.length === 0;
        dispatch(handleIsMusicInList(!isMusicInList));
    }, [musicList, dispatch]);

    return (
        <>
            {musicList.length > 0
                ?
                <ul className={`flex flex-col gap-1 ${className} no-scrollbar`}>
                    {musicList.map(song => {
                        return <Song song={song} key={song.id} songStyles={songStyles} logoStyles={logoStyles}
                                     albumCreating={albumCreating} shadow="shadow-xl"/>
                    })}
                </ul> :
                <p className="text-xl text-center content-center h-[56vh]">{translation.AllMusicAlreadyInAlbum}</p>
            }
        </>
    );
}

export default MusicListForForms;