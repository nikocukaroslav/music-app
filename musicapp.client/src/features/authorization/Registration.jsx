import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";
import {useState} from "react";
import {createUser} from "@/services/apiMusicApp.js";
import {generateGUID} from "@/helpers.js";
import CheckBox from "@/ui/CheckBox.jsx";

function Registration() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            id: generateGUID(),
            login: login,
            password: password,
        }

        await createUser(user);
        setLogin("")
        setPassword("")
    }

    return (
        <form className="flex flex-col gap-5 h-full"
              onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
                <span>Create login </span>
                <Input type="text"
                       required={true}
                       value={login}
                       onChange={(e) => setLogin(e.target.value)}/>
            </label>
            <label className="flex flex-col gap-2">
                <span>Pick password </span>
                <Input type={showPassword ? "text" : "password"}
                       required={true}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label className="text-sm flex items-center gap-2 -mt-2">
                <CheckBox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="appearance-none h-5 w-5 border-2 border-gray-500
                        rounded checked:bg-gray-500 focus:outline-none hover:bg-gray-500 "/>
                <span>Show password</span>
            </label>
            <Button className="main-color mt-auto">Create account</Button>
        </form>
    );
}

export default Registration;