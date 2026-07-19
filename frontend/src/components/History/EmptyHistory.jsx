import { FaHistory, FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmptyHistory = () => {

    const navigate = useNavigate();

    return (

        <div

            className="

                mt-8

                bg-slate-900

                border

                border-slate-700

                rounded-2xl

                p-16

                flex

                flex-col

                items-center

                justify-center

                text-center

            "

        >

            <div

                className="

                    w-28

                    h-28

                    rounded-full

                    bg-slate-800

                    flex

                    items-center

                    justify-center

                    mb-8

                "

            >

                <FaHistory

                    className="

                        text-5xl

                        text-blue-500

                    "

                />

            </div>

            <h2

                className="

                    text-3xl

                    font-bold

                    text-white

                "

            >

                No Detection History

            </h2>

            <p

                className="

                    text-slate-400

                    mt-4

                    max-w-xl

                "

            >

                You haven't analyzed any audio yet.

                Upload an audio file or use Live Detection to begin.

            </p>

            <button

                onClick={() => navigate("/detect")}

                className="

                    mt-8

                    flex

                    items-center

                    gap-3

                    bg-blue-600

                    hover:bg-blue-700

                    transition

                    px-8

                    py-4

                    rounded-xl

                    text-white

                    font-semibold

                "

            >

                <FaMicrophone />

                Start Detection

            </button>

        </div>

    );

};

export default EmptyHistory;