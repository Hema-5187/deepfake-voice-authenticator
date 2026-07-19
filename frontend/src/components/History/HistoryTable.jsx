import { FaDownload, FaTrash } from "react-icons/fa";
import { generatePDFReport } from "../../utils/pdfReport";

const HistoryTable = ({

    history,

    onDelete,

}) => {

    if (!history.length) {

        return null;

    }

    return (

        <div

            className="

                mt-8

                bg-slate-900

                border

                border-slate-700

                rounded-2xl

                overflow-hidden

            "

        >

            {/* Desktop Table */}

            <div className="hidden lg:block overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-slate-800">

                            <th className="text-left px-6 py-4 text-slate-300">

                                File

                            </th>

                            <th className="text-left px-6 py-4 text-slate-300">

                                Prediction

                            </th>

                            <th className="text-left px-6 py-4 text-slate-300">

                                Confidence

                            </th>

                            <th className="text-left px-6 py-4 text-slate-300">

                                Date

                            </th>

                            <th className="text-center px-6 py-4 text-slate-300">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            history.map((item) => (

                                <tr

                                    key={item.id}

                                    className="

                                        border-t

                                        border-slate-700

                                        hover:bg-slate-800

                                        transition

                                    "

                                >

                                    <td className="px-6 py-5">

                                        <p className="text-white font-semibold">

                                            {item.filename}

                                        </p>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span

                                            className={`

                                                px-4

                                                py-1

                                                rounded-full

                                                text-sm

                                                font-semibold

                                                ${

                                                    item.prediction === "REAL"

                                                        ? "bg-green-500/20 text-green-400"

                                                        : "bg-red-500/20 text-red-400"

                                                }

                                            `}

                                        >

                                            {item.prediction}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-white">

                                        {Number(item.probability).toFixed(2)}%

                                    </td>

                                    <td className="px-6 py-5 text-slate-400">

                                        {

                                            new Date(

                                                item.created_at

                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center gap-3">

                                            <button

                                                onClick={() =>

                                                    generatePDFReport(

                                                        item,

                                                        item.filename

                                                    )

                                                }

                                                className="

                                                    bg-blue-600

                                                    hover:bg-blue-700

                                                    p-3

                                                    rounded-lg

                                                    text-white

                                                "

                                            >

                                                <FaDownload />

                                            </button>

                                            <button

                                                onClick={() =>

                                                    onDelete(item.id)

                                                }

                                                className="

                                                    bg-red-600

                                                    hover:bg-red-700

                                                    p-3

                                                    rounded-lg

                                                    text-white

                                                "

                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {/* Mobile Cards */}

            <div className="lg:hidden p-5 space-y-5">

                {

                    history.map((item) => (

                        <div

                            key={item.id}

                            className="

                                bg-slate-800

                                rounded-xl

                                p-5

                            "

                        >

                            <h3 className="text-white font-bold">

                                {item.filename}

                            </h3>

                            <p className="text-slate-400 mt-2">

                                {

                                    new Date(

                                        item.created_at

                                    ).toLocaleString()

                                }

                            </p>

                            <div className="mt-4 flex justify-between items-center">

                                <span

                                    className={`

                                        px-4

                                        py-1

                                        rounded-full

                                        text-sm

                                        ${

                                            item.prediction === "REAL"

                                                ? "bg-green-500/20 text-green-400"

                                                : "bg-red-500/20 text-red-400"

                                        }

                                    `}

                                >

                                    {item.prediction}

                                </span>

                                <span className="text-white font-bold">

                                    {Number(item.probability).toFixed(2)}%

                                </span>

                            </div>

                            <div className="flex gap-3 mt-5">

                                <button

                                    onClick={() =>

                                        generatePDFReport(

                                            item,

                                            item.filename

                                        )

                                    }

                                    className="

                                        flex-1

                                        bg-blue-600

                                        rounded-xl

                                        py-3

                                        text-white

                                    "

                                >

                                    <FaDownload className="inline mr-2" />

                                    Report

                                </button>

                                <button

                                    onClick={() =>

                                        onDelete(item.id)

                                    }

                                    className="

                                        flex-1

                                        bg-red-600

                                        rounded-xl

                                        py-3

                                        text-white

                                    "

                                >

                                    <FaTrash className="inline mr-2" />

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default HistoryTable;