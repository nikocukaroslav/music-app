import {useDispatch} from "react-redux";
import NewAlbum from "@/svg/NewAlbum.jsx";
import {setActiveAlbum, toggleCreateAlbumForm} from "@/features/album/albumSlice.js";

function AddAlbumButton() {
    const dispatch = useDispatch();

    function handleCreateAlbumForm() {
        dispatch(toggleCreateAlbumForm());
        dispatch(setActiveAlbum(null));
    }

    return (
        <div
            onClick={handleCreateAlbumForm}
            className="p-2 w-full second-color text-xl hover:hover-color transition flex gap-3 items-center">
            <NewAlbum/>
            <span>New album</span>
        </div>
    );
}


export default AddAlbumButton;