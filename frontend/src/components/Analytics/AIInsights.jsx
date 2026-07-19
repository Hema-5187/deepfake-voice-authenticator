import { FaRobot, FaCheckCircle } from "react-icons/fa";
import Card from "../Common/Card";

const AIInsights = ({ stats }) => {

    const total = stats.total_scans || 0;

    const real = stats.real_predictions || 0;

    const fake = stats.fake_predictions || 0;

    const confidence = Number(stats.average_confidence || 0);

    const realPercentage =

        total > 0

            ? ((real / total) * 100).toFixed(1)

            : 0;

    const insights = [

        `Authentic voices represent ${realPercentage}% of all detections.`,

        `Average confidence is ${confidence.toFixed(2)}%.`,

        `The AI model has analyzed ${total} recordings.`,

        fake === 0
            ? "No AI-generated voices detected yet."
            : `${fake} AI-generated voices have been detected.`,

    ];

    return (

        <Card>

            <div className="flex items-center gap-3 mb-6">

                <FaRobot className="text-blue-500 text-3xl" />

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        AI Insights

                    </h2>

                    <p className="text-slate-400">

                        Automatic summary of your detection history

                    </p>

                </div>

            </div>

            <div className="space-y-5">

                {

                    insights.map((item, index) => (

                        <div

                            key={index}

                            className="

                                flex

                                items-start

                                gap-3

                                bg-slate-800

                                rounded-xl

                                p-4

                            "

                        >

                            <FaCheckCircle

                                className="

                                    text-green-400

                                    mt-1

                                "

                            />

                            <p className="text-slate-200">

                                {item}

                            </p>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

};

export default AIInsights;