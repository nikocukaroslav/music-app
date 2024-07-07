import {useSelector} from "react-redux";
import Song from "@/features/music/Song.jsx";

function MusicList({className, songStyles, albumCreating}) {
    const music = useSelector(state => state.music.music);

    return (
        <ul className={`flex flex-col divide-y-2 divide-gray-800 no-scrollbar overflow-auto h-full pb-20 ${className}`}>
            {music.map(song => {
                return <Song song={song} key={song.id} songStyles={songStyles} albumCreating={albumCreating}/>
            })}
        </ul>
    );
}

export default MusicList;
