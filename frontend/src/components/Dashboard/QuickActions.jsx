import {

    FaMicrophone,

    FaHistory,

    FaChartBar,

    FaUpload

} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Card from "../Common/Card";

const QuickActions = () => {

    const navigate = useNavigate();

    const actions = [

        {

            title: "Upload Audio",

            icon: <FaUpload />,

            route: "/detect"

        },

        {

            title: "Live Detection",

            icon: <FaMicrophone />,

            route: "/detect"

        },

        {

            title: "History",

            icon: <FaHistory />,

            route: "/history"

        },

        {

            title: "Analytics",

            icon: <FaChartBar />,

            route: "/analytics"

        }

    ];

    return (

        <Card>

            <h2 className="text-2xl font-bold text-white mb-6">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 gap-4">

                {

                    actions.map((action) => (

                        <button

                            key={action.title}

                            onClick={() => navigate(action.route)}

                            className="

                            bg-slate-800

                            hover:bg-blue-600

                            transition

                            rounded-xl

                            p-6

                            text-white

                            "

                        >

                            <div className="text-3xl mb-3">

                                {action.icon}

                            </div>

                            <p>

                                {action.title}

                            </p>

                        </button>

                    ))

                }

            </div>

        </Card>

    );

};

export default QuickActions;