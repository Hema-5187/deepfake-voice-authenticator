import { FaWaveSquare } from "react-icons/fa";

const LiveWaveform = ({ recording }) => {

    if (!recording) return null;

    return (

        <div className="mt-8 rounded-2xl bg-slate-900 p-6 border border-slate-700">

            <div className="flex items-center gap-3">

                <FaWaveSquare className="text-blue-500 text-3xl animate-pulse" />

                <div>

                    <h3 className="text-xl font-semibold text-white">

                        Live Recording

                    </h3>

                    <p className="text-slate-400">

                        Your microphone is currently recording...

                    </p>

                </div>

            </div>

            <div className="mt-6">

                <div className="flex items-end justify-center gap-1 h-24">

                    {[18, 42, 26, 58, 34, 62, 40, 55, 28, 50, 36, 60].map(

                        (height, index) => (

                            <div
                                key={index}
                                className="bg-blue-500 rounded-full animate-pulse"
                                style={{
                                    width: "8px",
                                    height: `${height}px`,
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            />

                        )

                    )}

                </div>
            </div>

        </div>

    );

};

export default LiveWaveform;