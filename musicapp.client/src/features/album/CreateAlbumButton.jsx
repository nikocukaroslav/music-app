import {useRef} from "react";
import {useDispatch} from "react-redux";
import {loadMusic} from "@/features/music/musicSlice.js";
import NewAlbum from "@/svg/NewAlbum.jsx";

function CreateAlbumButton() {
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
        <div
            onClick={handleClick}
            className="p-2 w-64 second-color text-xl hover:hover-color transition flex gap-3 items-center">
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange
            >
            </input>
            <NewAlbum/>
            <span>New album</span>
        </div>
    );
}


export default CreateAlbumButton;