import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createAlbum, toggleCreateAlbumForm,} from "@/features/album/albumSlice.js";
import {useState} from "react";
import {generateGUID} from "@/helpers.js";
import MusicListForForms from "@/features/album/MusicListForForms.jsx";
import {translation} from "@/features/settings/language.js";
import Input from "@/ui/Input.jsx";

function NewAlbumForm() {
    const [albumName, setAlbumName] = useState("");
    const musicList = useSelector((state) => state.music.selectedMusic);
    const userId = useSelector((state) => state.authorization.userId);
    const dispatch = useDispatch();

    function handleFormActive() {
        dispatch(toggleCreateAlbumForm());
    }

    async function handleAddAlbum(e) {
        e.preventDefault();
        const newAlbum = {
            id: generateGUID(),
            name: albumName,
            createdDate: new Date().toISOString(),
            userId: userId,
            musicList: musicList,
        };

        dispatch(createAlbum(newAlbum));
        handleFormActive();
    }

    return (
        <div
            className="text-color absolute z-20 backdrop-blur-[6px]
            top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen"
        >
            <form
                onSubmit={handleAddAlbum}
                className="w-1/3 max-[1150px]:w-2/3 max-[764px]:w-full max-[764px]:mx-5 max-[764px]:h-[70%] h-2/3 main-color p-5 rounded-xl flex flex-col shadow-xl">
                <label className="text-xl max-[764px]:text-lg flex flex-col gap-3 mb-3">
                    {translation.AlbumName}
                    <Input
                        type="text"
                        required={true}
                        onChange={(e) => setAlbumName(e.target.value)}
                    />
                </label>
                <div>
                    <MusicListForForms
                        songStyles="max-w-80 overflow-hidden"
                        logoStyles="p-2"
                        className="mb-auto overflow-auto max-h-[46vh] shadow shadow-gray-800"
                        albumCreating={true}
                    />
                </div>
                <div className="text-lg mt-auto flex gap-3">
                    <Button
                        onClick={handleFormActive}
                        className="border-2 border-color w-1/2"
                    >
                        {translation.Cancel}
                    </Button>
                    <Button
                        className="border-2 border-color background-color w-1/2 hover:main-color"
                        hoverColor="main-color"
                    >
                        {translation.Add}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default NewAlbumForm;
