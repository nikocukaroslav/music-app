import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createAlbum, toggleCreateAlbumForm} from "@/features/album/albumSlice.js";
import {useState} from "react";
import {generateGUID} from "@/helpers.js";
import MusicListForForms from "@/features/album/MusicListForForms.jsx";

function NewAlbumForm() {
    const [albumName, setAlbumName] = useState("");
    const musicList = useSelector(state => state.music.selectedMusic);

    const dispatch = useDispatch();

    function handleFormActive() {
        dispatch(toggleCreateAlbumForm())
    }

    async function handleAddAlbum(e) {
        e.preventDefault()
        const newAlbum = {
            id: generateGUID(),
            name: albumName,
            createdDate: new Date().toISOString(),
            musicList: musicList,
        }

        dispatch(createAlbum(newAlbum))
        handleFormActive();
    }

    return (
        <form
            className="absolute z-20 backdrop-blur-[6px] top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen"
            onSubmit={handleAddAlbum}>
            <div className="w-1/3 h-2/3 second-color p-5 rounded-xl flex flex-col shadow-xl">
                <label className="text-xl flex flex-col gap-3">Album name
                    <input type="text"
                           required
                           onChange={(e) => setAlbumName(e.target.value)}
                           className="p-1 background-color outline outline-gray-600 text-gray-100 rounded w-full"/>
                </label>
                <div>
                    <MusicListForForms songStyles="overflow-hidden max-w-72"
                                       className="mb-auto overflow-auto max-h-[46vh] shadow shadow-gray-800"
                                       albumCreating={true}/>
                </div>
                <div className="text-lg mt-auto flex gap-3 w-full">
                    <Button onClick={handleFormActive} className="border-2 border-color">Cancel</Button>
                    <Button className="border-2 border-color main-color hover:bg-gray-700">Add</Button>
                </div>
            </div>
        </form>
    );
}

export default NewAlbumForm;