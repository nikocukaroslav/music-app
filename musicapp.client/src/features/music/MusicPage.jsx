import MusicList from "@/features/music/MusicList.jsx";
import MusicToolbar from "@/features/music/MusicToolbar.jsx";

function MusicPage() {
    return (
        <div className="overflow-hidden">
            <MusicToolbar/>
            <MusicList/>
        </div>
    );
}

export default MusicPage;