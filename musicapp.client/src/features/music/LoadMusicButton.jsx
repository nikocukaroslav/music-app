import PlusSvg from "@/svg/PlusSvg.jsx";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadMusic} from "@/features/music/musicSlice.js";
import {translation} from "@/features/settings/language.js";
import BigButton from "@/ui/BigButton.jsx";

function LoadMusicButton() {
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authorization.userId);
    const musicIsPlaying = useSelector(state => state.music.musicId);

    function handleClick() {
        fileInputRef.current.click();
    }

    function uploadFiles(e) {
        dispatch(loadMusic({e, userId}));
        e.target.value = null;
    }

    return (
        <>
            <BigButton
                className="max-[764px]:hidden"
                onClick={handleClick}
                svg={<PlusSvg/>}>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    onChange={uploadFiles}
                />
                {translation.LoadMusic}
            </BigButton>
            <button
                onClick={handleClick}
                className={`z-20 hidden max-[764px]:flex absolute 
                    ${musicIsPlaying ? "bottom-24" : "bottom-2"} right-1 background-color-darker 
                    p-4 border-2 rounded-full border-color`}>
                <PlusSvg h="8" w="8"/>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    onChange={uploadFiles}
                />
            </button>
        </>
    );
}

export default LoadMusicButton;
