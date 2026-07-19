import { motion } from "framer-motion";

const StatsCard = ({
    title,
    value,
    icon,
    color,
}) => {

    return (

        <motion.div
            whileHover={{
                scale: 1.03,
                y: -5,
            }}
            transition={{
                duration: 0.2,
            }}
            className="
                bg-gradient-to-br
                from-slate-900
                to-slate-800
                rounded-2xl
                border
                border-slate-700
                shadow-xl
                p-6
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-400 text-sm font-medium">

                        {title}

                    </p>

                    <h2
                        style={{
                            color,
                        }}
                        className="text-5xl font-bold mt-4"
                    >

                        {value}

                    </h2>

                </div>

                <div
                    className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-slate-700
                        flex
                        justify-center
                        items-center
                        text-3xl
                    "
                >

                    {icon}

                </div>

            </div>

        </motion.div>

    );

};

export default StatsCard;