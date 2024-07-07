import LoadMusicButton from "@/features/music/LoadMusicButton.jsx";
import ShuffleSvg from "@/svg/ShuffleSvg.jsx";
import Button from "@/ui/Button.jsx";
import RepeatSvg from "@/svg/RepeatSvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanSelected,
    loopMusic,
    removeMusic,
    setShuffled,
    shuffleMusic,
    toggleSelectMode
} from "@/features/music/musicSlice.js";
import TrashSvg from "@/svg/TrashSvg.jsx";
import {useEffect, useRef, useState} from "react";
import AddMusicButton from "@/features/album/AddMusicButton.jsx";
import CrossSvg from "@/svg/CrossSvg.jsx";
import {removeFromAlbum} from "@/features/album/albumSlice.js";
import {translation} from "@/features/settings/language.js";

function MusicToolbar({albumToolsActive = false, className}) {
    const music = useSelector(state => state.music.music);
    const activeLooping = useSelector(state => state.music.loop);
    const activeShuffling = useSelector(state => state.music.shuffle);
    const activeSelectMode = useSelector(state => state.music.selectMode);
    const selectedMusic = useSelector(state => state.music.selectedMusic);
    const menuIsActive = useSelector(state => state.menu.menuIsActive)
    const musicIsPlaying = useSelector(state => state.music.musicUrl)
    const activeAlbum = useSelector(state => state.album.activeAlbum)
    const [confirmFormActive, setConfirmFormActive] = useState(false);

    const node = useRef();

    const dispatch = useDispatch();

    function handleShuffling() {
        dispatch(setShuffled())
        if (!musicIsPlaying) {
            dispatch(shuffleMusic())
        }
    }

    function handleLooping() {
        dispatch(loopMusic())
    }

    function handleSelectMode() {
        dispatch(toggleSelectMode())
    }

    function handleDeleting() {
        if (selectedMusic.length <= 0) return;
        setConfirmFormActive(true)
    }

    function handleDelete() {
        if (selectedMusic.length <= 0) return;
        selectedMusic.forEach(musicId => {
                dispatch(removeMusic(musicId));
            }
        )
        dispatch(cleanSelected());
        setConfirmFormActive(false)
        dispatch(toggleSelectMode());
    }

    function handleRemove() {
        if (selectedMusic.length <= 0) return;
        dispatch(removeFromAlbum(selectedMusic));
        dispatch(cleanSelected());
        setConfirmFormActive(false)
        dispatch(toggleSelectMode());
    }

    function handleCancel() {
        setConfirmFormActive(false);
        handleSelectMode();
        dispatch(cleanSelected());
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectedMusic.length <= 0) return;
            if (node.current && !node.current.contains(e.target)) {
                dispatch(toggleSelectMode());
                setConfirmFormActive(false);
                dispatch(cleanSelected());
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
        <nav className={`flex justify-between items-center  ${className}`}>
            {music.length > 0 &&
                <div className="flex gap-2">
                    <Button onClick={handleShuffling} clicked={activeShuffling}>
                        <ShuffleSvg/>
                    </Button>
                    <Button onClick={handleLooping} clicked={activeLooping}>
                        <RepeatSvg/>
                    </Button>
                    <Button className="ml-4 second-color" onClick={handleSelectMode}
                            clicked={activeSelectMode}>
                        {translation.Select}
                    </Button>

                    {albumToolsActive && <span
                        className="absolute flex translate-x-[150%] right-1/2 text-xl px-10 py-2">{activeAlbum?.name}</span>}

                    {activeSelectMode && <>
                        <Button onClick={handleDeleting}>
                            <TrashSvg h={5} w={5} color="child-color-3"/>
                        </Button>
                        {
                            confirmFormActive && (selectedMusic.length > 0) &&
                            <div
                                ref={node}
                                className={`px-7 py-5 shadow-xl second-color rounded-xl absolute z-40
                                bottom-2/4 left-1/3 flex flex-col gap-5 items-center 
                                border-2 border-gray-600 ${!menuIsActive && "translate-x-2/4"}`}>
                                <span>{translation.ConfirmDeleting}</span>
                                <div className="flex gap-3 ">
                                    <Button
                                        className="border-gray-600 border-2 px-5"
                                        onClick={handleCancel}>{translation.Cancel}
                                    </Button>
                                    <Button className="bg-red-600 px-5 hover:bg-red-700 "
                                            onClick={handleDelete}>{translation.Delete}
                                    </Button>
                                </div>
                            </div>
                        }
                        {albumToolsActive &&
                            <Button onClick={handleRemove}><CrossSvg className="child-color" h={5} w={5}/></Button>
                        }
                    </>
                    }
                </div>
            }
            {albumToolsActive ? <AddMusicButton/> : <LoadMusicButton/>}
        </nav>
    );
}

export default MusicToolbar;