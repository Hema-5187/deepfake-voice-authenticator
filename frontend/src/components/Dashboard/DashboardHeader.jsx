import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardHeader = ({ userName = "User" }) => {

    const hour = new Date().getHours();

    let greeting = "Hello";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    return (

        <motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.4 }}

            className="flex flex-col lg:flex-row justify-between items-center mb-10"

        >

            <div>

                <h1 className="text-4xl font-bold text-white">

                    {greeting}, {userName} 👋

                </h1>

                <p className="text-slate-400 mt-3">

                    Welcome back to your AI Voice Detection Dashboard.

                </p>

            </div>

            <div className="mt-6 lg:mt-0">

                <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-700">

                    <FaRobot

                        className="text-blue-500 text-3xl"

                    />

                    <div>

                        <p className="text-white font-semibold">

                            AI Engine

                        </p>

                        <p className="text-green-400 text-sm">

                            Online

                        </p>

                    </div>

                </div>

            </div>

        </motion.div>

    );

};

export default DashboardHeader;