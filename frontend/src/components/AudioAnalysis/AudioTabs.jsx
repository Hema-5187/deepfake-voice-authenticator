import { FaUpload, FaMicrophone } from "react-icons/fa";

const AudioTabs = ({ activeTab, setActiveTab }) => {

    return (

        <div className="flex justify-center mb-8">

            <div className="bg-slate-900 rounded-2xl p-2 flex gap-2">

                <button
                    onClick={() => setActiveTab("upload")}
                    className={`

                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        flex
                        items-center
                        gap-2

                        ${
                            activeTab === "upload"

                            ? "bg-blue-600 text-white"

                            : "text-slate-300 hover:bg-slate-800"
                        }

                    `}
                >

                    <FaUpload />

                    Upload Audio

                </button>

                <button
                    onClick={() => setActiveTab("live")}
                    className={`

                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        flex
                        items-center
                        gap-2

                        ${
                            activeTab === "live"

                            ? "bg-blue-600 text-white"

                            : "text-slate-300 hover:bg-slate-800"
                        }

                    `}
                >

                    <FaMicrophone />

                    Live Detection

                </button>

            </div>

        </div>

    );

};

export default AudioTabs;