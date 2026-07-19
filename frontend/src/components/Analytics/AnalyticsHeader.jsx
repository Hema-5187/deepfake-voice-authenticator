import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";

const AnalyticsHeader = () => {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: -20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.4,
            }}

            className="mb-10"

        >

            <div className="flex items-center gap-4">

                <div

                    className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-blue-600
                        flex
                        items-center
                        justify-center
                    "

                >

                    <FaChartLine className="text-white text-3xl" />

                </div>

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        Analytics Dashboard

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Monitor AI detection statistics, confidence,
                        and prediction trends.

                    </p>

                </div>

            </div>

        </motion.div>

    );

};

export default AnalyticsHeader;