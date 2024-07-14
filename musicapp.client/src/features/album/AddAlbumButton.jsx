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
        dispatch(cleanSelected());
    }

    return (
        <BigButton
            onClick={handleCreateAlbumForm}
            svg={<PlusSvg className="max-[764px]:h-8 max-[764px]:w-8 icon-color"/>}
            className="mb-3 max-[764px]:flex max-[764px]:flex-col max-[764px]:w-20
            max-[764px]:h-full max-[764px]:max-[764px]:py-1 max-[764px]:justify-end"
        >
            {translation.NewAlbum}
        </BigButton>
    );
}

export default AddAlbumButton;
