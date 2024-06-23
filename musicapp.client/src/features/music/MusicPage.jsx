import MusicList from "@/features/music/MusicList.jsx";
import MusicToolbar from "@/features/music/MusicToolbar.jsx";

function MusicPage() {
    return (
        <div className="overflow-hidden">
            <MusicToolbar/>
            <MusicList className="mx-4"/>
        </div>
    );
}

export default MusicPage;