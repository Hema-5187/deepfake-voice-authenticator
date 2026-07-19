import { FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DeleteDialog = ({

    open,

    onClose,

    onConfirm,

    filename,

}) => {

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        className="

                            fixed

                            inset-0

                            bg-black/60

                            flex

                            items-center

                            justify-center

                            z-50

                            px-4

                        "

                    >

                        <motion.div

                            initial={{

                                scale: 0.8,

                                opacity: 0,

                            }}

                            animate={{

                                scale: 1,

                                opacity: 1,

                            }}

                            exit={{

                                scale: 0.8,

                                opacity: 0,

                            }}

                            transition={{

                                duration: 0.25,

                            }}

                            className="

                                bg-slate-900

                                border

                                border-slate-700

                                rounded-2xl

                                w-full

                                max-w-md

                                p-8

                            "

                        >

                            <div className="flex justify-center">

                                <div

                                    className="

                                        w-20

                                        h-20

                                        rounded-full

                                        bg-red-500/20

                                        flex

                                        items-center

                                        justify-center

                                    "

                                >

                                    <FaExclamationTriangle

                                        className="

                                            text-red-500

                                            text-4xl

                                        "

                                    />

                                </div>

                            </div>

                            <h2

                                className="

                                    text-2xl

                                    font-bold

                                    text-center

                                    text-white

                                    mt-6

                                "

                            >

                                Delete Prediction?

                            </h2>

                            <p

                                className="

                                    text-slate-400

                                    text-center

                                    mt-4

                                "

                            >

                                Are you sure you want to delete

                            </p>

                            <p

                                className="

                                    text-white

                                    text-center

                                    font-semibold

                                    mt-2

                                    break-all

                                "

                            >

                                {filename}

                            </p>

                            <p

                                className="

                                    text-red-400

                                    text-center

                                    mt-5

                                    text-sm

                                "

                            >

                                This action cannot be undone.

                            </p>

                            <div className="flex gap-4 mt-8">

                                <button

                                    onClick={onClose}

                                    className="

                                        flex-1

                                        py-3

                                        rounded-xl

                                        bg-slate-700

                                        hover:bg-slate-600

                                        text-white

                                        transition

                                    "

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={onConfirm}

                                    className="

                                        flex-1

                                        py-3

                                        rounded-xl

                                        bg-red-600

                                        hover:bg-red-700

                                        text-white

                                        transition

                                    "

                                >

                                    Delete

                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

};

export default DeleteDialog;