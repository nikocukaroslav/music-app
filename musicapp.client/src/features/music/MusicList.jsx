import Song from "@/features/music/Song.jsx";
import {useSelector} from "react-redux";

function MusicList({className, songStyles, albumCreating}) {
    const music = useSelector(state => state.music.music);
    const activeAlbum = useSelector(state => state.album.activeAlbum)

    const musicList = activeAlbum ? music.filter(song =>
        activeAlbum.musicList.includes(song.id)
    ) : music;

    return (
        <ul className={`flex flex-col mt-4 divide-y-2 divide-gray-800 mb-24 ${className}`}>
            {musicList.map(song => {
                return <Song song={song} key={song.id} songStyles={songStyles} albumCreating={albumCreating}/>
            })}
        </ul>
    );
}


export default MusicList;