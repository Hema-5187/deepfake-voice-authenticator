import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {

    getHistory,

    deletePrediction as deletePredictionService,

} from "../services/history";

const useHistory = () => {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {

        try {

            setLoading(true);

            const data = await getHistory();

            setHistory(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load history.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchHistory();

    }, []);

    const deletePrediction = async (id) => {

        try {

            await deletePredictionService(id);

            setHistory(

                (prev) =>

                    prev.filter(

                        (item) => item.id !== id

                    )

            );

            toast.success("Prediction deleted.");

        }

        catch (error) {

            console.error(error);

            toast.error("Delete failed.");

            throw error;

        }

    };

    return {

        history,

        loading,

        fetchHistory,

        deletePrediction,

    };

};

export default useHistory;