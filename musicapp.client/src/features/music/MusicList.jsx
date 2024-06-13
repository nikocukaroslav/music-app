import {useLoaderData} from "react-router-dom";
import {getMusic} from "@/services/apiMusicApp.js";
import Song from "@/features/music/Song.jsx";

function MusicList() {
    const musicList = useLoaderData();

    return (
        <ul className="flex flex-col mt-3 divide-y-2 divide-gray-800 ">
            {musicList.map(song => {
                return <Song song={song} key={song.id}/>
            })}
        </ul>
    );
}

export async function musicLoader() {
    const music = await getMusic();
    return music;
}

export default MusicList;