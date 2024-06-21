import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {playNextSong, playPreviousSong, replaySong, shuffleMusic} from "@/features/music/musicSlice.js";
import {useEffect} from "react";


function Player() {
    const musicUrl = useSelector(state => state.music.musicUrl);
    const isLooping = useSelector(state => state.music.loop);
    const currentMusicName = useSelector(state => state.music.musicName);
    const isShuffled = useSelector(state => state.music.shuffle);
    const music = useSelector(state => state.music.music);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isShuffled) {
            handleShuffled();
        }
    }, [isShuffled]);

    function handleNext() {
        dispatch(playNextSong())
    }

    function handlePrevious() {
        dispatch(playPreviousSong())
    }

    function handleShuffled() {
        if (music.length > 0) {
            dispatch(shuffleMusic());
        }
    }

    return (
        <AudioPlayer
            id="player"
            className="absolute bottom-0"
            src={musicUrl}
            controls
            autoPlay
            onClickNext={isShuffled ? handleShuffled : handleNext}
            onClickPrevious={handlePrevious}
            showSkipControls
            showJumpControls={false}
            onEnded={isLooping ? () => dispatch(replaySong()) : (isShuffled ? handleShuffled : handleNext)}
            loop={isLooping}
            customAdditionalControls={[
                <p>{currentMusicName}</p>
            ]}
        />
    );
}

export default Player;
