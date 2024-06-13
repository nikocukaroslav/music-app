import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchMusic, playNextSong, playPreviousSong} from "@/features/music/musicSlice.js";


function Player() {
    const audioLink = useSelector(state => state.music.musicUrl);
    const isLooping = useSelector(state => state.music.loop);
    const currentMusicName = useSelector(state => state.music.musicName);

    const dispatch = useDispatch();

    async function handleNext() {
        await dispatch(fetchMusic())
        dispatch(playNextSong())
    }

    async function handlePrevious() {
        await dispatch(fetchMusic())
        dispatch(playPreviousSong())
    }

    return (

        <AudioPlayer
            src={audioLink}
            controls
            autoPlay
            loop={isLooping}
            onClickNext={handleNext}
            onClickPrevious={handlePrevious}
            showSkipControls
            className="mt-auto absolute bottom-0"
        />

    );
}

export default Player;
