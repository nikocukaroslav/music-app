import {useDispatch} from "react-redux";
import {toggleCreateAlbumForm} from "@/features/album/albumSlice.js";
import {cleanSelected} from "@/features/music/musicSlice.js";
import NewAlbum from "@/svg/NewAlbum.jsx";
import BigButton from "@/ui/BigButton.jsx";
import {translation} from "@/features/settings/language.js";

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
            className="w-full"
        >
            {translation.NewAlbum}
        </BigButton>
    );
}


export default AddAlbumButton;