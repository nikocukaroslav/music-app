import {useDispatch, useSelector} from "react-redux";
import {
    addToSelected,
    copyToClipboard,
    removeFromSelected,
    removeMusic,
    setActiveMusic,
    setActiveMusicId,
    setActiveMusicName,
} from "@/features/music/musicSlice.js";
import OptionsButton from "@/ui/OptionsButton.jsx";
import {addToMusicList, removeFromAlbum, removeFromMusicList,} from "@/features/album/albumSlice.js";
import NoteSvg from "@/svg/NoteSvg.jsx";
import {useEffect, useState} from "react";
import PauseSvg from "@/svg/PauseSvg.jsx";
import PlaySvg from "@/svg/PlaySvg.jsx";
import {randomColor, toShortTime} from "@/helpers.js";
import CheckBox from "@/ui/CheckBox.jsx";

function Song({
                  song,
                  logoStyles = "p-4 max-[764px]:p-3",
                  songStyles,
                  albumCreating = false,
                  shadow = "shadow",
              }) {
    const [hover, setHover] = useState(false);
    const [color, setColor] = useState(
        localStorage.getItem(`color[${song.id}]`) || "",
    );
    const currentPlaying = useSelector((state) => state.music.musicUrl);
    const isSelectModeActive = useSelector((state) => state.music.selectMode);
    const isPlaying = useSelector((state) => state.music.isPlaying);

    const dispatch = useDispatch();

    const musicUrl = song.url;

    const isActive = currentPlaying === musicUrl;

    useEffect(() => {
        if (!color) {
            const newColor = randomColor();
            setColor(newColor);
        }
    }, [color]);

    useEffect(() => {
        if (color) {
            localStorage.setItem(`color[${song.id}]`, color);
        }
    }, [color, song.id]);

    function handleActive() {
        if (!isActive) {
            dispatch(setActiveMusic(musicUrl));
            dispatch(setActiveMusicName(song.name));
            dispatch(setActiveMusicId(song.id));
        } else {
            dispatch(setActiveMusic(""));
            dispatch(setActiveMusicName(""));
            dispatch(setActiveMusicId(""));
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
        setTimeout(() => dispatch(copyToClipboard()), 3000);
        dispatch(copyToClipboard());
    }

    function handleSelected(e) {
        if (e.target.checked) {
            dispatch(addToMusicList(song));
            dispatch(addToSelected(song.id));
        } else {
            dispatch(removeFromMusicList(song.id));
            dispatch(removeFromSelected(song.id));
        }
    }

    return (
        <li
            onClick={handleActive}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            className={`flex justify-between ${isActive ? "hover-color" : "main-color"}
                 content-center items-center hover:hover-color transition  rounded-md ${shadow}`}
        >
            <div className="flex gap-5 items-center max-[764px]:gap-3">
                <div className={`${color} rounded-l-md  ${logoStyles}`}>
                    {!hover && !isActive ? (
                        <NoteSvg className="icon-color-darker pr-1 svg-14 "/>
                    ) : isActive && isPlaying ? (
                        <PauseSvg className="icon-color-darker svg-14 "/>
                    ) : (
                        <PlaySvg className="icon-color-darker svg-14"/>
                    )}
                </div>
                <span className={`text-wrap break-all pr-5 leading-5 line-clamp-2 max-[764px]:text-sm ${songStyles}`}>
          {song.name}
        </span>
            </div>
            <div className="flex items-center gap-10 max-[764px]:gap-3">
                <span className="max-[764px]:text-sm">{toShortTime(song.duration)}</span>
                {albumCreating || isSelectModeActive ? (
                    <CheckBox
                        type="checkbox"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={handleSelected}
                        className="mr-5 max-[764px]:mr-2"
                    />
                ) : (
                    <OptionsButton
                        onDelete={handleDelete}
                        onShare={handleShare}
                        onRemove={handleRemove}
                        className="right-5 top-6"
                    />
                )}
            </div>
        </li>
    );
}

export default Song;
