import {useDispatch} from "react-redux";
import {toggleCreateAlbumForm} from "@/features/album/albumSlice.js";
import {cleanSelected} from "@/features/music/musicSlice.js";
import BigButton from "@/ui/BigButton.jsx";
import {translation} from "@/features/settings/language.js";
import PlusSvg from "@/svg/PlusSvg.jsx";

function AddAlbumButton() {
    const dispatch = useDispatch();

    function handleCreateAlbumForm() {
        dispatch(toggleCreateAlbumForm());
        dispatch(cleanSelected())
    }

    return (
        <BigButton
            onClick={handleCreateAlbumForm}
            svg={<PlusSvg/>}
            className="w-full mb-3"
        >
            {translation.NewAlbum}
        </BigButton>
    );
}


export default AddAlbumButton;