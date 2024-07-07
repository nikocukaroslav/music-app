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
import OptionsButton from "@/ui/OptionsButton.jsx";
import {addToMusicList, removeFromAlbum, removeFromMusicList} from "@/features/album/albumSlice.js";
import NoteSvg from "@/svg/NoteSvg.jsx";
import {useState} from "react";
import PauseSvg from "@/svg/PauseSvg.jsx";
import PlaySvg from "@/svg/PlaySvg.jsx";
import {toShortTime} from "@/helpers.js";

function Song({song, songStyles, albumCreating = false}) {
    const [hover, setHover] = useState(false);
    const currentPlaying = useSelector(state => state.music.musicUrl);
    const isSelectModeActive = useSelector(state => state.music.selectMode);
    const isPlaying = useSelector(state => state.music.isPlaying);

    const dispatch = useDispatch();

    const musicUrl = song.url;

    const isActive = currentPlaying === musicUrl;

    function handleActive() {
        if (!isActive) {
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

    function handleRemove(e) {
        e.stopPropagation();
        dispatch(removeFromAlbum(song.id));
    }

    function handleShare(e) {
        e.stopPropagation();
        navigator.clipboard.writeText(musicUrl);
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

    console.log(song.duration)
    return (
        <li onClick={handleActive}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            className={`flex justify-between ${isActive ? "hover-color" : "second-color"} 
                p-2 content-center items-center hover:hover-color transition`}>
            <div className="flex gap-5 items-center">
                <div className="song-logo-three p-5">
                    {(!hover && !isActive) ? <NoteSvg/> : (isActive && isPlaying) ?
                        <PauseSvg h={11} w={11} className="child-color-2"/> :
                        <PlaySvg h={11} w={11} className="child-color-2"/>}
                </div>
                <span className={songStyles}>{song.name}</span>
            </div>
            <div className="flex items-center gap-10">
                <span>{toShortTime(song.duration)}</span>
                {
                    albumCreating || isSelectModeActive ?
                        <input type="checkbox"
                               onClick={e => e.stopPropagation()}
                               onChange={handleSelected}
                               className="appearance-none h-5 w-5 border-2 border-green-600
                        rounded checked:bg-green-600 focus:outline-none hover:bg-green-600 "
                        /> :
                        <OptionsButton onDelete={handleDelete} onShare={handleShare} onRemove={handleRemove}
                                       className="right-5 top-6"/>
                }
            </div>
        </li>
    );
}

export default Song;