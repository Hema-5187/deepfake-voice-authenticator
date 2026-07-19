import { FaBell } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {

    const { user } = useAuth();

    const username = user?.email
        ? user.email.split("@")[0]
        : "User";

    return (

        <header className="h-20 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">

            <div>

                <h1 className="text-3xl font-bold text-white">

                    Dashboard

                </h1>

                <p className="text-slate-400 mt-1">

                    Welcome back,

                    <span className="text-blue-400 font-semibold ml-1">

                        {username}

                    </span>

                    👋

                </p>

            </div>

            <div className="flex items-center gap-6">

                <FaBell
                    className="text-slate-400 text-xl cursor-pointer"
                />

                <div className="text-right">

                    <p className="text-white font-semibold">

                        {user?.email}

                    </p>

                </div>

            </div>

        </header>

    );

};

export default Navbar;