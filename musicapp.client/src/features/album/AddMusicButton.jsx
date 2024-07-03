import PlusSvg from "@/svg/PlusSvg.jsx";
import {toggleAddMusicForm} from "@/features/album/albumSlice.js";
import {useDispatch} from "react-redux";

function AddMusicButton() {
    const dispatch = useDispatch();

    function handleFormActive() {
        dispatch(toggleAddMusicForm());
    }

    return (
        <div
            onClick={handleFormActive}
            className="p-2  w-64 second-color text-xl hover:hover-color transition flex gap-3 items-center">
            <PlusSvg/>
            <span>Add music</span>
        </div>
    );
}


export default AddMusicButton;