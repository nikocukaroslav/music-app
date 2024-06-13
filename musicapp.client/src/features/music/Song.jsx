import PlaySvg from "@/svg/PlaySvg.jsx";
import DotsSvg from "@/svg/DotsSvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setActiveMusic, setActiveMusicId, setActiveMusicName} from "@/features/music/musicSlice.js";
import PauseSvg from "@/svg/PauseSvg.jsx";

function Song({song}) {
    const musicUrl = song.url;
    const dispatch = useDispatch();
    const currentPlaying = useSelector(state => state.music.musicUrl);

    const isPlaying = currentPlaying === musicUrl;

    function handleActive() {
        if (!isPlaying) {
            dispatch(setActiveMusic(musicUrl))
            dispatch(setActiveMusicName(song.name))
            dispatch(setActiveMusicId(song.id))
        } else {
            dispatch(setActiveMusic(""))
            dispatch(setActiveMusicName(""))
            dispatch(setActiveMusicId(""))
        }
    }

    return (
        <li onClick={handleActive}
            className={`flex justify-between ${isPlaying ? "hover-color" : "second-color"}  mx-4 
                p-2 content-center items-center hover:hover-color transition`}>
            {isPlaying ? < PauseSvg/> : <PlaySvg/>}
            <span>{song.name}</span>
            <DotsSvg/>
        </li>
    );
}

export default Song;