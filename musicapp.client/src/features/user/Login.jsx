import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";

function Login() {
    return (
        <form className="flex flex-col gap-5 h-full ">
            <label className="flex flex-col gap-2">
                <span>Login</span>
                <Input type="text"/>
            </label>
            <label className="flex flex-col gap-2">
                <span>Password </span>
                <Input type="text"/>
            </label>
            <Button className="main-color mt-auto">Login</Button>
        </form>
    );
}

export default Login;