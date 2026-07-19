import { FaHistory, FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";

const HistoryHeader = ({ onDownload }) => {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: -20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.4
            }}

            className="
                flex
                justify-between
                items-center
                mb-10
            "

        >

            <div>

                <h1 className="text-4xl font-bold text-white flex items-center gap-4">

                    <FaHistory className="text-blue-500" />

                    Detection History

                </h1>

                <p className="text-slate-400 mt-3">

                    View, search and manage every AI voice analysis.

                </p>

            </div>

            <button

                onClick={onDownload}

                className="
                    flex
                    items-center
                    gap-2
                    bg-red-600
                    hover:bg-red-700
                    px-5
                    py-3
                    rounded-xl
                    text-white
                    font-semibold
                    shadow-lg
                    transition-all
                    duration-300
                "

            >

                <FaFilePdf size={18} />

                Download Full Report

            </button>

        </motion.div>

    );

};

export default HistoryHeader;