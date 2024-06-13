import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useSelector} from "react-redux";


function Player() {
    const audioLink = useSelector(state => state.music.musicUrl)

    console.log(audioLink)

    return (
        <AudioPlayer
            src={audioLink}
            controls
            autoPlay
            className="mt-auto absolute bottom-0"
        />

    );
}

export default Player;
