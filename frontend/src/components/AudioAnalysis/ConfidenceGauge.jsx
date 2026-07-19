import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ConfidenceGauge = ({ probability }) => {

    const getColor = () => {

        if (probability >= 90) return "#22c55e"; // Green
        if (probability >= 70) return "#facc15"; // Yellow
        return "#ef4444"; // Red

    };

    const getLabel = () => {

        if (probability >= 90) return "Very High";
        if (probability >= 70) return "High";
        if (probability >= 50) return "Medium";
        return "Low";

    };

    return (

        <div className="flex flex-col items-center">

            <div className="w-44 h-44">

                <CircularProgressbar
                    value={probability}
                    text={`${probability}%`}
                    styles={buildStyles({
                        textColor: "#ffffff",
                        pathColor: getColor(),
                        trailColor: "#1e293b",
                        textSize: "16px",
                    })}
                />

            </div>

            <h3 className="text-white text-xl font-semibold mt-4">

                Confidence

            </h3>

            <p
                className="font-semibold mt-1"
                style={{ color: getColor() }}
            >

                {getLabel()}

            </p>

        </div>

    );

};

export default ConfidenceGauge;