import MainLayout from "../layouts/MainLayout";

import LoadingSpinner from "../components/Common/LoadingSpinner";

import AnalyticsHeader from "../components/Analytics/AnalyticsHeader";
import AnalyticsCards from "../components/Analytics/AnalyticsCards";
import BarChartCard from "../components/Analytics/BarChartCard";
import PieChartCard from "../components/Analytics/PieChartCard";
import AIInsights from "../components/Analytics/AIInsights";

import useDashboard from "../hooks/useDashboard";

const AnalyticsPage = () => {

    const {

        stats,

        loading,

    } = useDashboard();

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <MainLayout>

            <AnalyticsHeader />

            <div className="mt-8">

                <AnalyticsCards

                    stats={stats}

                />

            </div>

            <div

                className="

                    grid

                    grid-cols-1

                    xl:grid-cols-2

                    gap-6

                    mt-8

                "

            >

                <BarChartCard

                    stats={stats}

                />

                <PieChartCard

                    stats={stats}

                />

            </div>

            <div className="mt-8">

                <AIInsights

                    stats={stats}

                />

            </div>

        </MainLayout>

    );

};

export default AnalyticsPage;