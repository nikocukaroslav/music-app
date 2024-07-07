import PlusSvg from "@/svg/PlusSvg.jsx";
import {toggleAddMusicForm} from "@/features/album/albumSlice.js";
import {useDispatch} from "react-redux";
import {translation} from "@/features/settings/language.js";
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
            {translation.AddMusic}
        </BigButton>
    );
}


export default AddMusicButton;