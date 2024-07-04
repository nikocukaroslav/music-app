import PlusSvg from "@/svg/PlusSvg.jsx";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {loadMusic} from "@/features/music/musicSlice.js";
import {$LoadMusic} from "@/features/settings/language.js";
import BigButton from "@/ui/BigButton.jsx";

function LoadMusicButton() {
    const fileInputRef = useRef();
    const dispatch = useDispatch();

    function handleClick() {
        fileInputRef.current.click();
    }

    function uploadFiles(e) {
        dispatch(loadMusic(e));
        e.target.value = null;
    }

    return (
        <BigButton
            onClick={handleClick}
            svg={<PlusSvg/>}>
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={uploadFiles}
            >
            </input>
            {$LoadMusic}
        </BigButton>
    );
}


export default LoadMusicButton;