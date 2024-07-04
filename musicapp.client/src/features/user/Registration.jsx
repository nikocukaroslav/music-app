import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";

function Registration() {
    return (
        <form className="flex flex-col gap-5 h-full">
            <label className="flex flex-col gap-2">
                <span>Create login </span>
                <Input type="text"/>
            </label>
            <label className="flex flex-col gap-2">
                <span>Pick password </span>
                <Input type="text"/>
            </label>
            <Button className="main-color mt-auto">Create account</Button>
        </form>
    );
}

export default Registration;