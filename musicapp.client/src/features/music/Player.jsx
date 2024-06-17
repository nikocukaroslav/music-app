import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchMusic, playNextSong, playPreviousSong, shuffleMusic} from "@/features/music/musicSlice.js";


function Player() {
    const audioLink = useSelector(state => state.music.musicUrl);
    const isLooping = useSelector(state => state.music.loop);
    const currentMusicName = useSelector(state => state.music.musicName);
    const isShuffled = useSelector(state => state.music.shuffle);
    const music = useSelector(state => state.music.music);

    const dispatch = useDispatch();

    async function handleNext() {
        await dispatch(fetchMusic())
        await dispatch(playNextSong())
    }

    async function handlePrevious() {
        await dispatch(fetchMusic())
        await dispatch(playPreviousSong())
    }

    async function handleShuffled() {
        await dispatch(fetchMusic());
        if (music.length > 0)
            await dispatch(shuffleMusic());
    }

    return (
        <AudioPlayer
            className="absolute bottom-0"
            src={audioLink}
            controls
            autoPlay
            loop={isLooping}
            onClickNext={isShuffled ? handleShuffled : handleNext}
            onClickPrevious={handlePrevious}
            showSkipControls
            showJumpControls={false}
            onEnded={!isLooping && (isShuffled ? handleShuffled : handleNext)}
            customAdditionalControls={[
                <p>{currentMusicName}</p>
            ]}
        />
    );
}

export default Player;
