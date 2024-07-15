import MusicList from "@/features/music/MusicList.jsx";
import MusicToolbar from "@/features/music/MusicToolbar.jsx";

function MusicPage() {
    return (
        <div className="overflow-hidden w-full mx-4 ">
            <MusicToolbar className="my-3"/>
            <MusicList/>
        </div>
    );
}

export default MusicPage;