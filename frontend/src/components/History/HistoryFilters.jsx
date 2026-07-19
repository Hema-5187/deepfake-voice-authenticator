import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const HistoryFilters = ({

    search,

    setSearch,

    filter,

    setFilter,

    sort,

    setSort,

}) => {

    return (

        <div

            className="

                bg-slate-900

                border

                border-slate-700

                rounded-2xl

                p-6

                mt-8

            "

        >

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Search */}

                <div>

                    <label className="text-slate-300 font-medium flex items-center gap-2 mb-2">

                        <FaSearch />

                        Search

                    </label>

                    <input

                        type="text"

                        placeholder="Search by filename..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                        className="

                            w-full

                            rounded-xl

                            bg-slate-800

                            border

                            border-slate-700

                            px-4

                            py-3

                            text-white

                            focus:outline-none

                            focus:border-blue-500

                        "

                    />

                </div>

                {/* Filter */}

                <div>

                    <label className="text-slate-300 font-medium flex items-center gap-2 mb-2">

                        <FaFilter />

                        Prediction

                    </label>

                    <select

                        value={filter}

                        onChange={(e) =>

                            setFilter(e.target.value)

                        }

                        className="

                            w-full

                            rounded-xl

                            bg-slate-800

                            border

                            border-slate-700

                            px-4

                            py-3

                            text-white

                            focus:outline-none

                            focus:border-blue-500

                        "

                    >

                        <option value="ALL">

                            All

                        </option>

                        <option value="REAL">

                            Authentic

                        </option>

                        <option value="FAKE">

                            AI Generated

                        </option>

                    </select>

                </div>

                {/* Sort */}

                <div>

                    <label className="text-slate-300 font-medium flex items-center gap-2 mb-2">

                        <FaSortAmountDown />

                        Sort

                    </label>

                    <select

                        value={sort}

                        onChange={(e) =>

                            setSort(e.target.value)

                        }

                        className="

                            w-full

                            rounded-xl

                            bg-slate-800

                            border

                            border-slate-700

                            px-4

                            py-3

                            text-white

                            focus:outline-none

                            focus:border-blue-500

                        "

                    >

                        <option value="NEWEST">

                            Newest First

                        </option>

                        <option value="OLDEST">

                            Oldest First

                        </option>

                        <option value="HIGH">

                            Highest Confidence

                        </option>

                        <option value="LOW">

                            Lowest Confidence

                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

};

export default HistoryFilters;