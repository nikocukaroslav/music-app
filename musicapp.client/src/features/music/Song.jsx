import PlaySvg from "@/svg/PlaySvg.jsx";
import DotsSvg from "@/svg/DotsSvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setActiveMusic} from "@/features/music/musicSlice.js";
import PauseSvg from "@/svg/PauseSvg.jsx";

function Song({song}) {
    const musicUrl = song.url;
    const dispatch = useDispatch();
    const currentPlaying = useSelector(state => state.music.musicUrl);

    const isPlaying = currentPlaying === musicUrl;

    function handleActive() {
        dispatch(setActiveMusic(musicUrl))
    }


    return (
        <li onClick={handleActive}
            className={`flex justify-between ${isPlaying ? "hover-color" : "second-color"} rounded mx-2 my-1
                p-2 content-center items-center hover:hover-color transition`}>
            {isPlaying ? < PauseSvg/> : <PlaySvg/>}
            <span>{song.name}</span>
            <DotsSvg/>
        </li>
    );
}

export default Song;