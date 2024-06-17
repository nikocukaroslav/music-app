import Song from "@/features/music/Song.jsx";
import {useSelector} from "react-redux";

function MusicList() {
    const musicList = useSelector(state => state.music.music);

    return (
        <ul className="flex flex-col mt-4 divide-y-2 divide-gray-800 mx-2 mb-24">
            {musicList.map(song => {
                return <Song song={song} key={song.id}/>
            })}
        </ul>
    );
}


export default MusicList;