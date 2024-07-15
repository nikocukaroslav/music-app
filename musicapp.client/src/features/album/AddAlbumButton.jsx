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
            svg={<PlusSvg className="max-[1150px]:h-8 max-[1150px]:w-8 icon-color"/>}
            className="mb-3 max-[1150px]:flex max-[1150px]:flex-col max-[1150px]:w-20
            max-[1150px]:h-full max-[1150px]:py-1 max-[1150px]:justify-end max-[1150px]:gap-5"
        >
            {translation.NewAlbum}
        </BigButton>
    );
}

export default AddAlbumButton;
