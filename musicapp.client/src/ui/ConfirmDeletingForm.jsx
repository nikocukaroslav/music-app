import {translation} from "@/features/settings/language.js";
import Button from "@/ui/Button.jsx";

function ConfirmDeletingForm({onCancel, onDelete}) {
    return (
        <div
            className="absolute z-40 backdrop-blur-[6px] top-0 left-0 right-0 bottom-0 flex justify-center
            items-center"
        >
            <div
                className="p-5 flex flex-col gap-5 border-2 border-color text-center shadow-xl main-color rounded-md h-32">
                <span>{translation.ConfirmDeleting}</span>
                <div className="flex gap-3">
                    <Button className="border-color border-2 px-5" onClick={onCancel}>
                        {translation.Cancel}
                    </Button>
                    <Button
                        className="bg-red-600 px-5 hover:bg-red-700"
                        onClick={onDelete}
                    >
                        {translation.Delete}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeletingForm;
