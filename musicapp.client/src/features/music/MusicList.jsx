import {useSelector} from "react-redux";
import Song from "@/features/music/Song.jsx";

function MusicList({className, songStyles, albumCreating}) {
    const music = useSelector(state => state.music.music);

    return (
        <ul className={`flex flex-col mt-4 divide-y-2 divide-gray-800 mb-24 ${className}`}>
            {music.map(song => {
                return <Song song={song} key={song.id} songStyles={songStyles} albumCreating={albumCreating}/>
            })}
        </ul>
    );
}

export default MusicList;
