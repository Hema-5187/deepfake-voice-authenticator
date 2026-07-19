import { useEffect, useState } from "react";

import { getDashboardStats } from "../services/dashboard";

const useDashboard = () => {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    return {

        stats,

        loading,

        refreshDashboard: loadDashboard

    };

};

export default useDashboard;