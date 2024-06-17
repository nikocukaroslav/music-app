import LoadMusicButton from "@/features/music/LoadMusicButton.jsx";
import ShuffleSvg from "@/svg/ShuffleSvg.jsx";
import Button from "@/ui/Button.jsx";
import RepeatSvg from "@/svg/RepeatSvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loopMusic, removeMusic, setSelectMode, setShuffled} from "@/features/music/musicSlice.js";
import TrashSvg from "@/svg/TrashSvg.jsx";
import NewAlbum from "@/svg/NewAlbum.jsx";
import {useEffect, useRef, useState} from "react";

function MusicToolbar() {
    const activeLooping = useSelector(state => state.music.loop);
    const activeShuffling = useSelector(state => state.music.shuffle);
    const activeSelectMode = useSelector(state => state.music.selectMode);
    const selectedMusic = useSelector(state => state.music.selectedMusic);
    const [confirmFormActive, setConfirmFormActive] = useState(false);
    const node = useRef();

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
        setConfirmFormActive(false);
        if (selectedMusic === null) return;
        selectedMusic.map(music =>
            dispatch(removeMusic(music))
        )
    }


    useEffect(() => {
        if (selectedMusic === null) return;
        const handleClickOutside = (e) => {
            if (!node.current.contains(e.target)) {
                dispatch(setSelectMode());
                setConfirmFormActive(false);
            }
        };

        if (activeSelectMode) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeSelectMode, dispatch, selectedMusic]);


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
                    <Button onClick={() => setConfirmFormActive(true)}>
                        <TrashSvg h={5} w={5} color={"child-color-3"}/>
                    </Button>
                    {
                        confirmFormActive &&
                        <div
                            ref={node}
                            className="px-7 py-5 shadow-xl second-color rounded-xl absolute z-40
                            bottom-2/4 right-2/4  translate-y-2.5 flex flex-col gap-5 items-center">
                            <span> Are you sure?</span>
                            <div className="flex gap-3 ">
                                <Button
                                    className="border-gray-600 border-2 px-5"
                                    onClick={() => {
                                        setConfirmFormActive(false);
                                        handleSelectMode();
                                    }}>Cancel</Button>
                                <Button className="bg-red-600 px-5 hover:bg-red-700"
                                        onClick={handleDelete}>Delete</Button>
                            </div>
                        </div>
                    }
                    <Button className="flex items-center gap-3">
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