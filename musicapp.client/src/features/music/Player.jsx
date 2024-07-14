import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  playNextSong,
  playPreviousSong,
  setIsPlaying,
  shuffleMusic,
} from "@/features/music/musicSlice.js";
import { useEffect, useRef, useState } from "react";
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

  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.audio.current.loop = isLooping;
    }
  }, [isLooping]);

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
      ref={playerRef}
      loop={isLooping}
      id="player"
      className="flex justify-center"
      src={musicUrl}
      controls
      autoPlay
      onClickNext={isShuffled ? handleShuffled : handleNext}
      onClickPrevious={handlePrevious}
      showSkipControls
      showJumpControls={showJumpControls}
      onEnded={isShuffled ? handleShuffled : handleNext}
      onVolumeChange={handleVolumeChange}
      volume={volume}
      customAdditionalControls={[
        <div
          key={musicUrl}
          className="flex items-center justify-center max-[764px]:w-52 h-52 overflow-hidden"
        >
          <p className={"max-[764px]:music-name text-center w-[80vw]"}>
            {currentMusicName}
          </p>
        </div>,
      ]}
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
