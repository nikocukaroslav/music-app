import {useSelector} from "react-redux";
import Album from "@/features/album/Album.jsx";

function AlbumList() {
    const albums = useSelector((state) => state.album.albums);

    return (
        <ul className="flex flex-col gap-3 max-[1150px]:flex-row max-[1150px]:max-w-full overflow-auto no-scrollbar">
            {albums.map((album) => {
                return <Album album={album} key={album.id}/>;
            })}
        </ul>
    );
}

export default AlbumList;
