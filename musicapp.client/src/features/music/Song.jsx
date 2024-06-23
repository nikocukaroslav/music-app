import PlaySvg from "@/svg/PlaySvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    addToSelected,
    copyToClipboard,
    removeFromSelected,
    removeMusic,
    setActiveMusic,
    setActiveMusicId,
    setActiveMusicName
} from "@/features/music/musicSlice.js";
import PauseSvg from "@/svg/PauseSvg.jsx";
import OptionsButton from "@/ui/OptionsButton.jsx";
import {addToMusicList, removeFromMusicList} from "@/features/album/albumSlice.js";

function Song({song, songStyles, albumCreating = false}) {
    const currentPlaying = useSelector(state => state.music.musicUrl);
    const isSelectModeActive = useSelector((state) => state.music.selectMode);

    const dispatch = useDispatch();

    const musicUrl = song.url;
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


    function handleDelete(e) {
        e.stopPropagation();
        dispatch(removeMusic(song.id));
    }

    function handleShare(e) {
        e.stopPropagation();
        navigator.clipboard.writeText(song.url);
        setTimeout(() => dispatch(copyToClipboard()), 3000)
        dispatch(copyToClipboard());
    }

    function handleSelected(e) {
        if (e.target.checked) {
            dispatch(addToMusicList(song));
            dispatch(addToSelected(song.id));
        } else {
            dispatch(removeFromMusicList(song.id))
            dispatch(removeFromSelected(song.id))
        }
    }


    return (
        <li onClick={handleActive}
            className={`flex justify-between ${isPlaying ? "hover-color" : "second-color"} 
                p-2 content-center items-center hover:hover-color transition`}>
            {isPlaying ? < PauseSvg/> : <PlaySvg/>}
            <span className={songStyles}>{song.name}</span>
            {
                albumCreating || isSelectModeActive ?
                    <input type="checkbox"
                           onClick={e => e.stopPropagation()}
                           onChange={handleSelected}
                           className="appearance-none h-5 w-5 border-2 border-green-600
                        rounded checked:bg-green-600 focus:outline-none hover:bg-green-600 "
                    /> :
                    <OptionsButton onDelete={handleDelete} onShare={handleShare}/>
            }
        </li>
    );
}

export default Song;