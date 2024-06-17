import LoadMusicButton from "@/features/music/LoadMusicButton.jsx";
import ShuffleSvg from "@/svg/ShuffleSvg.jsx";
import Button from "@/ui/Button.jsx";
import RepeatSvg from "@/svg/RepeatSvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loopMusic, removeMusic, setSelectMode, setShuffled} from "@/features/music/musicSlice.js";
import TrashSvg from "@/svg/TrashSvg.jsx";
import NewAlbum from "@/svg/NewAlbum.jsx";

function MusicToolbar() {
    const activeLooping = useSelector(state => state.music.loop);
    const activeShuffling = useSelector(state => state.music.shuffle);
    const activeSelectMode = useSelector(state => state.music.selectMode);
    const selectedMusic = useSelector(state => state.music.selectedMusic);

    const dispatch = useDispatch();

    function handleShuffling() {
        dispatch(setShuffled())
    }

    function handleLooping() {
        dispatch(loopMusic())
    }

    function handleSelectMode() {
        dispatch(setSelectMode())
    }

    function handleDelete() {
        selectedMusic.map(music =>
            dispatch(removeMusic(music))
        )
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
                <Button className={`ml-4`} onClick={handleSelectMode} clicked={activeSelectMode}>
                    Select
                </Button>
                {activeSelectMode && <>
                    <Button onClick={handleDelete}>
                        <TrashSvg h={5} w={5} color={"child-color-3"}/>
                    </Button>
                    <Button className={`flex items-center gap-3`}>
                        <NewAlbum/>
                        <span>New album</span>
                    </Button>
                </>
                }
            </div>
            <LoadMusicButton/>
        </nav>
    );
}

export default MusicToolbar;