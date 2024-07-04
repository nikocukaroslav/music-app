import {useDispatch} from "react-redux";
import {toggleCreateAlbumForm} from "@/features/album/albumSlice.js";
import {cleanSelected} from "@/features/music/musicSlice.js";
import NewAlbum from "@/svg/NewAlbum.jsx";
import {$NewAlbum} from "@/features/settings/language.js";
import BigButton from "@/ui/BigButton.jsx";

function AddAlbumButton() {
    const dispatch = useDispatch();

    function handleCreateAlbumForm() {
        dispatch(toggleCreateAlbumForm());
        dispatch(cleanSelected())
    }

    return (
        <BigButton
            onClick={handleCreateAlbumForm}
            svg={<NewAlbum/>}
        >
            {$NewAlbum}
        </BigButton>
    );
}


export default AddAlbumButton;