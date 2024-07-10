import LoadMusicButton from "@/features/music/LoadMusicButton.jsx";
import ShuffleSvg from "@/svg/ShuffleSvg.jsx";
import Button from "@/ui/Button.jsx";
import RepeatSvg from "@/svg/RepeatSvg.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanSelected,
  loopMusic,
  removeMusic,
  setShuffled,
  shuffleMusic,
  toggleSelectMode,
} from "@/features/music/musicSlice.js";
import TrashSvg from "@/svg/TrashSvg.jsx";
import { useEffect, useRef, useState } from "react";
import AddMusicButton from "@/features/album/AddMusicButton.jsx";
import CrossSvg from "@/svg/CrossSvg.jsx";
import { removeFromAlbum } from "@/features/album/albumSlice.js";
import { translation } from "@/features/settings/language.js";
import ConfirmDeletingForm from "@/ui/ConfirmDeletingForm.jsx";

function MusicToolbar({ albumToolsActive = false, className }) {
  const music = useSelector((state) => state.music.music);
  const activeLooping = useSelector((state) => state.music.loop);
  const activeShuffling = useSelector((state) => state.music.shuffle);
  const activeSelectMode = useSelector((state) => state.music.selectMode);
  const selectedMusic = useSelector((state) => state.music.selectedMusic);
  const menuIsActive = useSelector((state) => state.menu.menuIsActive);
  const musicIsPlaying = useSelector((state) => state.music.musicUrl);
  const activeAlbum = useSelector((state) => state.album.activeAlbum);
  const [deletingFormActive, setDeletingFormActive] = useState(false);

  const node = useRef();

  const dispatch = useDispatch();

  function handleShuffling() {
    dispatch(setShuffled());
    if (!musicIsPlaying) {
      dispatch(shuffleMusic());
    }
  }

  function handleLooping() {
    dispatch(loopMusic());
  }

  function handleSelectMode() {
    dispatch(toggleSelectMode());
  }

  function handleDeleting() {
    if (selectedMusic.length <= 0) return;
    setDeletingFormActive(true);
  }

  function handleDelete() {
    if (selectedMusic.length <= 0) return;
    selectedMusic.forEach((musicId) => {
      dispatch(removeMusic(musicId));
    });
    dispatch(cleanSelected());
    setDeletingFormActive(false);
    dispatch(toggleSelectMode());
  }

  function handleRemove() {
    if (selectedMusic.length <= 0) return;
    dispatch(removeFromAlbum(selectedMusic));
    dispatch(cleanSelected());
    setDeletingFormActive(false);
    dispatch(toggleSelectMode());
  }

  function handleCancel() {
    setDeletingFormActive(false);
    handleSelectMode();
    dispatch(cleanSelected());
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectedMusic.length <= 0) return;
      if (node.current && !node.current.contains(e.target)) {
        dispatch(toggleSelectMode());
        setDeletingFormActive(false);
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
    <nav className={`flex justify-between items-center ${className}`}>
      {music.length > 0 && (
        <div className="flex gap-2">
          <Button onClick={handleShuffling} clicked={activeShuffling}>
            <ShuffleSvg />
          </Button>
          <Button onClick={handleLooping} clicked={activeLooping}>
            <RepeatSvg />
          </Button>
          <Button
            className="ml-4 main-color"
            onClick={handleSelectMode}
            clicked={activeSelectMode}
          >
            {translation.Select}
          </Button>

          {activeSelectMode && (
            <>
              <Button onClick={handleDeleting}>
                <TrashSvg h={5} w={5} className="icon-color" />
              </Button>
              {deletingFormActive && selectedMusic.length > 0 && (
                <ConfirmDeletingForm
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                />
              )}
              {albumToolsActive && (
                <Button onClick={handleRemove}>
                  <CrossSvg className="icon-color" h={5} w={5} />
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {albumToolsActive && <span className="text-xl">{activeAlbum?.name}</span>}
      {albumToolsActive ? <AddMusicButton /> : <LoadMusicButton />}
    </nav>
  );
}

export default MusicToolbar;
