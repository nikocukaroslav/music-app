import PlusSvg from "@/svg/PlusSvg.jsx";
import {useRef} from "react";
import {uploadMusic} from "@/services/apiMusicApp.js";

function LoadMusicButton() {
    const fileInputRef = useRef();

    function handleClick() {
        fileInputRef.current.click();
    }

    return (
        <div
            onClick={handleClick}
            className="p-2 w-64 second-color text-xl hover:hover-color transition flex gap-3 items-center">
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={uploadMusic}
            >
            </input>
            <PlusSvg/>
            <span>Load music</span>
        </div>
    );
}

export default LoadMusicButton;