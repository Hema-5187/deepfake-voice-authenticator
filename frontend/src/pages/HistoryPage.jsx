import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/Common/LoadingSpinner";

import HistoryHeader from "../components/History/HistoryHeader";
import HistoryStats from "../components/History/HistoryStats";
import HistoryFilters from "../components/History/HistoryFilters";
import HistoryTable from "../components/History/HistoryTable";
import EmptyHistory from "../components/History/EmptyHistory";
import DeleteDialog from "../components/History/DeleteDialog";
import { generateHistoryPDF } from "../utils/historyPdfReport";

import useHistory from "../hooks/useHistory";
import useProfile from "../hooks/useProfile";

const HistoryPage = () => {

    const {

        history,

        loading,

        deletePrediction,

        fetchHistory,

    } = useHistory();
    
    const { profile } = useProfile();

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const [sort, setSort] = useState("NEWEST");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedPrediction, setSelectedPrediction] = useState(null);

    /* ===========================
       Filter & Sort History
    =========================== */

    const filteredHistory = useMemo(() => {

        let data = [...history];

        /* Search */

        if (search.trim()) {

            data = data.filter((item) =>
                item.filename
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        /* Filter */

        if (filter === "REAL") {

            data = data.filter(
                (item) => item.prediction === "REAL"
            );

        }

        if (filter === "FAKE") {

            data = data.filter(
                (item) => item.prediction !== "REAL"
            );

        }

        /* Sorting */

        switch (sort) {

            case "NEWEST":

                data.sort(
                    (a, b) =>
                        new Date(b.created_at) -
                        new Date(a.created_at)
                );

                break;

            case "OLDEST":

                data.sort(
                    (a, b) =>
                        new Date(a.created_at) -
                        new Date(b.created_at)
                );

                break;

            case "HIGH":

                data.sort(
                    (a, b) =>
                        b.probability - a.probability
                );

                break;

            case "LOW":

                data.sort(
                    (a, b) =>
                        a.probability - b.probability
                );

                break;

            default:

                break;

        }

        return data;

    }, [

        history,

        search,

        filter,

        sort,

    ]);

    /* ===========================
       Debug Logs
    =========================== */

    console.log("History:", history);
    console.log("Filtered History:", filteredHistory);

    /* ===========================
       Loading
    =========================== */

    if (loading) {

        return <LoadingSpinner />;

    }

    /* ===========================
       Delete Dialog
    =========================== */

    const handleDeleteClick = (prediction) => {

        setSelectedPrediction(prediction);

        setDialogOpen(true);

    };

    const handleCloseDialog = () => {

        setDialogOpen(false);

        setSelectedPrediction(null);

    };

    const handleDeleteConfirm = async () => {

        if (!selectedPrediction) return;

        try {

            await deletePrediction(selectedPrediction.id);

            toast.success("Prediction deleted successfully.");

            await fetchHistory();

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to delete prediction.");

        }

        finally {

            handleCloseDialog();

        }

    };

    return (

        <MainLayout>

            {/* Header */}

            <HistoryHeader 
             onDownload={() => generateHistoryPDF(filteredHistory,profile)} />

            {/* Statistics */}

            <div className="mt-8">

                <HistoryStats
                    history={filteredHistory}
                    profile={profile}
                />

            </div>

            {/* Filters */}

            <HistoryFilters
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
            />

            {/* Table / Empty State */}

            {
                filteredHistory.length === 0
                    ? (
                        <EmptyHistory />
                    )
                    : (
                        <HistoryTable
                            history={filteredHistory}
                            onDelete={(id) => {

                                const prediction = filteredHistory.find(
                                    (item) => item.id === id
                                );

                                if (prediction) {

                                    handleDeleteClick(prediction);

                                }

                            }}
                        />
                    )
            }

            {/* Delete Confirmation */}

            <DeleteDialog
                open={dialogOpen}
                filename={selectedPrediction?.filename}
                onClose={handleCloseDialog}
                onConfirm={handleDeleteConfirm}
            />

        </MainLayout>

    );

};

export default HistoryPage;