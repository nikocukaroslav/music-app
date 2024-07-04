import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleAddMusicForm, updateAlbum} from "@/features/album/albumSlice.js";
import MusicListForForms from "@/features/album/MusicListForForms.jsx";
import {cleanSelected} from "@/features/music/musicSlice.js";
import {$Add, $Cancel} from "@/features/settings/language.js";

function AddMusicForm() {
    const selectedMusic = useSelector(state => state.music.selectedMusic);
    const isMusicInList = useSelector(state => state.album.isMusicInList);

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateAlbum(selectedMusic));
        dispatch(toggleAddMusicForm());
        dispatch(cleanSelected())
    }

    function handleFormActive(e) {
        e.preventDefault();
        dispatch(toggleAddMusicForm());
    }

    return (
        <form
            className="absolute z-20 backdrop-blur-[6px] top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen"
            onSubmit={handleSubmit}>
            <div className="w-1/3 h-2/3 second-color p-5 rounded-xl flex flex-col shadow-xl">
                <div>
                    <MusicListForForms filter={true} songStyles="overflow-hidden max-w-72"
                                       className="mb-auto overflow-auto max-h-[52vh] shadow shadow-gray-800"
                                       albumCreating={true}/>
                </div>
                <div className="text-lg mt-auto flex gap-3 w-full">
                    <Button onClick={handleFormActive} className="border-2 border-color">{$Cancel}</Button>
                    {isMusicInList &&
                        <Button
                            className="border-2 border-color main-color hover:bg-gray-700">{$Add}</Button>}
                </div>
            </div>
        </form>
    );
}

export default AddMusicForm;