import {
    FaFolder,
    FaCheckCircle,
    FaTimesCircle,
    FaChartLine,
} from "react-icons/fa";

import StatsCard from "../Dashboard/StatsCard";

const AnalyticsCards = ({ stats }) => {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatsCard
                title="Total Scans"
                value={stats.total_scans}
                color="#3B82F6"
                icon={<FaFolder className="text-blue-400" />}
            />

            <StatsCard
                title="Authentic"
                value={stats.real_predictions}
                color="#22C55E"
                icon={<FaCheckCircle className="text-green-400" />}
            />

            <StatsCard
                title="AI Generated"
                value={stats.fake_predictions}
                color="#EF4444"
                icon={<FaTimesCircle className="text-red-400" />}
            />

            <StatsCard
                title="Avg Confidence"
                value={`${stats.average_confidence}%`}
                color="#F59E0B"
                icon={<FaChartLine className="text-yellow-400" />}
            />

        </div>

    );

};

export default AnalyticsCards;