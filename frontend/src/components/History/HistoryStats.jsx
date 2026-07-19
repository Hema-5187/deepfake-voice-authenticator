import {
    FaFolder,
    FaCheckCircle,
    FaTimesCircle,
    FaChartLine,
} from "react-icons/fa";

import StatsCard from "../Dashboard/StatsCard";

const HistoryStats = ({ history = [] }) => {

    const total = history.length;

    const real = history.filter(
        (item) => item.prediction === "REAL"
    ).length;

    const fake = history.filter(
        (item) => item.prediction !== "REAL"
    ).length;

    const averageConfidence =
        total > 0
            ? (
                  history.reduce(
                      (sum, item) =>
                          sum + Number(item.probability || 0),
                      0
                  ) / total
              ).toFixed(2)
            : 0;

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatsCard
                title="Total Predictions"
                value={total}
                color="#3B82F6"
                icon={<FaFolder className="text-blue-400" />}
            />

            <StatsCard
                title="Authentic"
                value={real}
                color="#22C55E"
                icon={<FaCheckCircle className="text-green-400" />}
            />

            <StatsCard
                title="AI Generated"
                value={fake}
                color="#EF4444"
                icon={<FaTimesCircle className="text-red-400" />}
            />

            <StatsCard
                title="Avg Confidence"
                value={`${averageConfidence}%`}
                color="#F59E0B"
                icon={<FaChartLine className="text-yellow-400" />}
            />

        </div>

    );

};

export default HistoryStats;