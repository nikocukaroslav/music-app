import PlusSvg from "@/svg/PlusSvg.jsx";
import {toggleAddMusicForm} from "@/features/album/albumSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {translation} from "@/features/settings/language.js";
import BigButton from "@/ui/BigButton.jsx";

function AddMusicButton() {
    const dispatch = useDispatch();
    const musicIsPlaying = useSelector(state => state.music.musicId);

    function handleFormActive() {
        dispatch(toggleAddMusicForm());
    }

    return (
        <>
            <BigButton
                onClick={handleFormActive}
                svg={<PlusSvg/>}
                className="max-[764px]:hidden"
            >
                <span>{translation.AddMusic}</span>
            </BigButton>
            <button
                onClick={handleFormActive}
                className={`z-10 hidden max-[764px]:flex absolute 
                    ${musicIsPlaying ? "bottom-24" : "bottom-2"} right-1 background-color-darker 
                    p-4 border-2 rounded-full border-color`}>
                <PlusSvg h="8" w="8"/>
            </button>
        </>
    );
}


export default AddMusicButton;