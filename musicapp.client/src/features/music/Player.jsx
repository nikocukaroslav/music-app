import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function Player() {
    const audioLink = "https://res.cloudinary.com/dbamhuz47/video/upload/v1718205820/cexeljv6chojfnmmddyt.mp4"
    return (
        <AudioPlayer
            src={audioLink}
            controls
            className="mt-auto absolute bottom-0"
        />

    );
}

export default Player;
