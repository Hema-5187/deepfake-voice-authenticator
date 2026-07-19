import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
    FaMicrophone,
    FaArrowRight,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

import Card from "../Common/Card";

const RecentPrediction = ({ history = [] }) => {

    return (

        <Card>

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Recent Predictions

                    </h2>

                    <p className="text-slate-400 mt-1">

                        Latest AI detection results

                    </p>

                </div>

                <Link

                    to="/history"

                    className="

                    text-blue-400

                    hover:text-blue-300

                    flex

                    items-center

                    gap-2

                    "

                >

                    View All

                    <FaArrowRight />

                </Link>

            </div>

            {

                history.length === 0 ? (

                    <div

                        className="

                        h-72

                        flex

                        flex-col

                        justify-center

                        items-center

                        text-center

                        "

                    >

                        <FaMicrophone

                            className="

                            text-6xl

                            text-slate-600

                            mb-5

                            "

                        />

                        <h3

                            className="

                            text-xl

                            text-white

                            font-semibold

                            "

                        >

                            No Predictions Yet

                        </h3>

                        <p

                            className="

                            text-slate-400

                            mt-3

                            "

                        >

                            Upload an audio file to begin AI voice detection.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {

                            history

                                .slice(0, 5)

                                .map((item, index) => (

                                    <motion.div

                                        key={item.id}

                                        initial={{

                                            opacity: 0,

                                            y: 15,

                                        }}

                                        animate={{

                                            opacity: 1,

                                            y: 0,

                                        }}

                                        transition={{

                                            delay: index * 0.08,

                                        }}

                                        className="

                                        bg-slate-800

                                        hover:bg-slate-700

                                        transition-all

                                        rounded-2xl

                                        p-5

                                        "

                                    >

                                        <div className="flex justify-between">

                                            <div>

                                                <h3

                                                    className="

                                                    text-white

                                                    font-semibold

                                                    "

                                                >

                                                    {item.filename}

                                                </h3>

                                                <p

                                                    className="

                                                    text-slate-400

                                                    text-sm

                                                    mt-1

                                                    "

                                                >

                                                    {

                                                        new Date(

                                                            item.created_at

                                                        ).toLocaleString()

                                                    }

                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <div

                                                    className={`

                                                    inline-flex

                                                    items-center

                                                    gap-2

                                                    px-3

                                                    py-1

                                                    rounded-full

                                                    text-sm

                                                    font-semibold

                                                    ${

                                                        item.prediction === "REAL"

                                                            ? "bg-green-500/20 text-green-400"

                                                            : "bg-red-500/20 text-red-400"

                                                    }

                                                `}

                                                >

                                                    {

                                                        item.prediction === "REAL"

                                                            ?

                                                            <FaCheckCircle />

                                                            :

                                                            <FaTimesCircle />

                                                    }

                                                    {

                                                        item.prediction

                                                    }

                                                </div>

                                                <p

                                                    className="

                                                    text-white

                                                    mt-3

                                                    text-lg

                                                    font-bold

                                                    "

                                                >

                                                    {

                                                        Number(

                                                            item.probability

                                                        ).toFixed(2)

                                                    }%

                                                </p>

                                            </div>

                                        </div>

                                    </motion.div>

                                ))

                        }

                    </div>

                )

            }

        </Card>

    );

};

export default RecentPrediction;