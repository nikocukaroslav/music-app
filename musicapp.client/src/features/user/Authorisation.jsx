import {NavLink, Outlet} from "react-router-dom";

function Authorisation() {
    return (
        <main className="bg-gradient-to-bl from-gray-500 to-gray-600 h-screen flex items-center justify-center">
            <div className="h-2/3 w-1/3 second-color rounded-xl overflow-hidden relative">
                <nav className="shadow-xl flex divide-x-2 divide-gray-700 text-center absolute w-full">
                    <NavLink
                        className={({isActive}) => !isActive ? "w-1/2 hover:hover-color p-3 transition" : "w-1/2 p-3 hover-color"}
                        to="Login">Log in</NavLink>
                    <NavLink
                        className={({isActive}) => !isActive ? "w-1/2 hover:hover-color p-3 transition" : "w-1/2 p-3 hover-color"}
                        to="Registration">Register</NavLink>
                </nav>
                <div className="py-6 px-6 h-full pt-16 text-xl">
                    <Outlet/>
                </div>
            </div>
        </main>
    );
}

export default Authorisation;