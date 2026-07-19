import {

    FaDatabase,

    FaRobot,

    FaServer,

    FaCheckCircle,

} from "react-icons/fa";

import Card from "../Common/Card";

const AIStatusCard = () => {

    const services = [

        {

            title: "AI Model",

            icon: <FaRobot className="text-blue-500" />,

            status: "Loaded"

        },

        {

            title: "Backend API",

            icon: <FaServer className="text-green-500" />,

            status: "Connected"

        },

        {

            title: "Database",

            icon: <FaDatabase className="text-yellow-500" />,

            status: "Connected"

        },

        {

            title: "System",

            icon: <FaCheckCircle className="text-purple-500" />,

            status: "Ready"

        }

    ];

    return (

        <Card>

            <h2 className="text-2xl font-bold text-white mb-6">

                AI System Status

            </h2>

            <div className="space-y-5">

                {

                    services.map((service) => (

                        <div

                            key={service.title}

                            className="

                            flex

                            justify-between

                            items-center

                            bg-slate-800

                            rounded-xl

                            p-4

                            "

                        >

                            <div className="flex items-center gap-3">

                                <div className="text-2xl">

                                    {service.icon}

                                </div>

                                <div>

                                    <p className="text-white font-semibold">

                                        {service.title}

                                    </p>

                                </div>

                            </div>

                            <span

                                className="

                                bg-green-500/20

                                text-green-400

                                px-3

                                py-1

                                rounded-full

                                text-sm

                                "

                            >

                                {service.status}

                            </span>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

};

export default AIStatusCard;