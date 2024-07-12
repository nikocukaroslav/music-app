import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  playNextSong,
  playPreviousSong,
  replaySong,
  setIsPlaying,
  shuffleMusic,
} from "@/features/music/musicSlice.js";
import { useEffect, useState } from "react";
import VolumeSvg from "@/svg/VolumeSvg.jsx";
import VolumeMuteSvg from "@/svg/VolumeMuteSvg.jsx";

function Player() {
  const musicUrl = useSelector((state) => state.music.musicUrl);
  const isLooping = useSelector((state) => state.music.loop);
  const currentMusicName = useSelector((state) => state.music.musicName);
  const isShuffled = useSelector((state) => state.music.shuffle);
  const music = useSelector((state) => state.music.music);
  const showJumpControls = useSelector(
    (state) => state.settings.showJumpControls,
  );
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShuffled) {
      handleShuffled();
    }
  }, [isShuffled]);

  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume]);

  function handleNext() {
    dispatch(playNextSong());
  }

  function handlePrevious() {
    dispatch(playPreviousSong());
  }

  function handleShuffled() {
    if (music.length > 0) {
      dispatch(shuffleMusic());
    }
  }

  const handleVolumeChange = (e) => {
    setVolume(e.target.volume);
  };

  return (
    <AudioPlayer
      id="player"
      src={musicUrl}
      controls
      autoPlay
      onClickNext={isShuffled ? handleShuffled : handleNext}
      onClickPrevious={handlePrevious}
      showSkipControls
      showJumpControls={showJumpControls}
      onEnded={
        isLooping
          ? () => dispatch(replaySong())
          : isShuffled
            ? handleShuffled
            : handleNext
      }
      loop={isLooping}
      onVolumeChange={handleVolumeChange}
      volume={volume}
      customAdditionalControls={[<p>{currentMusicName}</p>]}
      onListen={() => dispatch(setIsPlaying(true))}
      onPause={() => dispatch(setIsPlaying(false))}
      customIcons={{
        volume: <VolumeSvg className="svg-6 icon-color" />,
        volumeMute: <VolumeMuteSvg className="svg-6 icon-color" />,
      }}
    />
  );
}

export default Player;
