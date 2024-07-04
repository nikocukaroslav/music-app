import Song from "@/features/music/Song.jsx";
import {useDispatch, useSelector} from "react-redux";
import {handleIsMusicInList} from "@/features/album/albumSlice.js";
import {useEffect} from "react";
import {$AllMusicAlreadyInAlbum} from "@/features/settings/language.js";

function MusicListForForms({className, songStyles, albumCreating, filter = false}) {
    const allMusic = useSelector(state => state.music.allMusic)
    const activeAlbum = useSelector(state => state.album.activeAlbum)

    const dispatch = useDispatch();

    const musicList = filter ? allMusic.filter(song => !activeAlbum.musicList.includes(song.id)) : allMusic

    useEffect(() => {
        const isMusicInList = musicList.length === 0;
        dispatch(handleIsMusicInList(!isMusicInList));
    }, [musicList, dispatch]);

    return (
        <>
            {musicList.length > 0
                ?
                <ul className={`flex flex-col mt-4 divide-y-2 divide-gray-800 mb-24 ${className}`}>
                    {musicList.map(song => {
                        return <Song song={song} key={song.id} songStyles={songStyles}
                                     albumCreating={albumCreating}/>
                    })}
                </ul> :
                <p className="text-xl text-center content-center h-[56vh]">{$AllMusicAlreadyInAlbum}</p>
            }
        </>
    );
}

export default MusicListForForms;