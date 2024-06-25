import {useRef} from "react";
import PlusSvg from "@/svg/PlusSvg.jsx";

function AddMusicButton() {
    const fileInputRef = useRef();

    function handleClick() {
        fileInputRef.current.click();
    }

    return (
        <div
            onClick={handleClick}
            className="p-2  w-64 second-color text-xl hover:hover-color transition flex gap-3 items-center">
            <PlusSvg/>
            <span>Add music</span>
        </div>
    );
}


export default AddMusicButton;