import PlusSvg from "@/svg/PlusSvg.jsx";
import {toggleAddMusicForm} from "@/features/album/albumSlice.js";
import {useDispatch} from "react-redux";
import {$AddMusic} from "@/features/settings/language.js";
import BigButton from "@/ui/BigButton.jsx";

function AddMusicButton() {
    const dispatch = useDispatch();

    function handleFormActive() {
        dispatch(toggleAddMusicForm());
    }

    return (
        <BigButton
            onClick={handleFormActive}
            svg={<PlusSvg/>}
        >
            {$AddMusic}
        </BigButton>
    );
}


export default AddMusicButton;