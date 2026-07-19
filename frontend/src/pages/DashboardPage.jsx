import MainLayout from "../layouts/MainLayout";

import LoadingSpinner from "../components/Common/LoadingSpinner";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsGrid from "../components/Dashboard/StatsGrid";
import TrendChart from "../components/Dashboard/TrendChart";
import PieChartCard from "../components/Dashboard/PieChartCard";
import AIStatusCard from "../components/Dashboard/AIStatusCard";
import RecentPrediction from "../components/Dashboard/RecentPrediction";
import QuickActions from "../components/Dashboard/QuickActions";

import useDashboard from "../hooks/useDashboard";
import useHistory from "../hooks/useHistory";

const DashboardPage = () => {

    const {

        stats,

        loading

    } = useDashboard();

    const {

        history,

        loading: historyLoading

    } = useHistory();

    if (loading || historyLoading) {

        return <LoadingSpinner />;

    }

    return (

        <MainLayout>

            {/* Dashboard Header */}

            <DashboardHeader />

            {/* Statistics */}

            <div className="mt-8">

                <StatsGrid

                    stats={stats}

                />

            </div>

            {/* Charts */}

            <div

                className="

                    grid

                    grid-cols-1

                    xl:grid-cols-2

                    gap-6

                    mt-8

                "

            >

                <TrendChart />

                <PieChartCard />

            </div>

            {/* AI Status + Recent Prediction */}

            <div

                className="

                    grid

                    grid-cols-1

                    xl:grid-cols-2

                    gap-6

                    mt-8

                "

            >

                <AIStatusCard />

                <RecentPrediction

                    history={history}

                />

            </div>

            {/* Quick Actions */}

            <div className="mt-8">

                <QuickActions />

            </div>

        </MainLayout>

    );

};

export default DashboardPage;