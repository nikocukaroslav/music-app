import {useLoaderData} from "react-router-dom";
import {getMusic} from "@/services/apiMusicApp.js";
import Song from "@/features/music/Song.jsx";

function MusicList() {
    const musicList = useLoaderData();
    console.log(musicList)
    return (
        <ul className="flex flex-col gap-1 mt-1 ">
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