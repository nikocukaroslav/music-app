import LoadMusicButton from "@/features/music/LoadMusicButton.jsx";
import ShuffleSvg from "@/svg/ShuffleSvg.jsx";
import Button from "@/ui/Button.jsx";
import RepeatSvg from "@/svg/RepeatSvg.jsx";
import {useDispatch} from "react-redux";
import {loopMusic} from "@/features/music/musicSlice.js";
import {useState} from "react";

function MusicToolbar() {
    const [activeLooping, setActiveLooping] = useState(false);
    const [activeShuffling, setActiveShuffling] = useState(false);

    const dispatch = useDispatch();

    function handleShuffling() {
        setActiveShuffling(!activeShuffling)
    }

    function handleLooping() {
        setActiveLooping(!activeLooping)
        dispatch(loopMusic())
    }

    return (
        <nav className="flex justify-between items-center m-2">
            <div className="flex gap-2">
                <Button onClick={handleShuffling} clicked={activeShuffling}>
                    <ShuffleSvg/>
                </Button>
                <Button onClick={handleLooping} clicked={activeLooping}>
                    <RepeatSvg/>
                </Button>
            </div>
            <LoadMusicButton/>
        </nav>
    );
}

export default MusicToolbar;