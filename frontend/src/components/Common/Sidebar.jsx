import {
    FaHome,
    FaMicrophone,
    FaHistory,
    FaChartLine,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaShieldAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {

    const { user, logout } = useAuth();

    const username = user?.email
        ? user.email.split("@")[0]
        : "User";

    const menu = [

        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            title: "AI Detection",
            path: "/detect",
            icon: <FaMicrophone />
        },

        {
            title: "History",
            path: "/history",
            icon: <FaHistory />
        },

        {
            title: "Analytics",
            path: "/analytics",
            icon: <FaChartLine />
        },

        {
            title: "Profile",
            path: "/profile",
            icon: <FaUser />
        },

        {
            title: "Settings",
            path: "/settings",
            icon: <FaCog />
        }

    ];

    return (

        <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col min-h-screen">

            {/* Logo */}

            <div className="p-8 border-b border-slate-800">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

                        <FaShieldAlt
                            className="text-white text-2xl"
                        />

                    </div>

                    <div>

                        <h2 className="text-white font-bold text-xl">

                            Deepfake AI

                        </h2>

                        <p className="text-slate-400 text-sm">

                            Voice Authenticator

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 py-6">

                {

                    menu.map((item) => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `

                                flex

                                items-center

                                gap-4

                                mx-4

                                mb-2

                                px-5

                                py-4

                                rounded-xl

                                transition-all

                                duration-300

                                ${isActive

                                    ? "bg-blue-600 text-white shadow-lg"

                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"}

                                `

                            }

                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            {item.title}

                        </NavLink>

                    ))

                }

            </nav>

            {/* User */}

            <div className="border-t border-slate-800 p-6">

                <div className="mb-5">

                    <h3 className="text-white font-semibold">

                        {username}

                    </h3>

                    <p className="text-slate-400 text-sm">

                        {user?.email}

                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <div className="w-2 h-2 rounded-full bg-green-500" />

                        <span className="text-green-400 text-sm">

                            Online

                        </span>

                    </div>

                </div>

                <button

                    onClick={logout}

                    className="

                    w-full

                    flex

                    items-center

                    justify-center

                    gap-2

                    bg-red-600

                    hover:bg-red-700

                    text-white

                    py-3

                    rounded-xl

                    transition-all

                    "

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;