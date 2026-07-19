import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import Card from "../Common/Card";

const data = [

    { day: "Mon", scans: 5 },

    { day: "Tue", scans: 8 },

    { day: "Wed", scans: 12 },

    { day: "Thu", scans: 7 },

    { day: "Fri", scans: 15 },

    { day: "Sat", scans: 10 },

    { day: "Sun", scans: 18 }

];

const TrendChart = () => {

    return (

        <Card>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Detection Trend

                </h2>

                <p className="text-slate-400 mt-2">

                    Voice analyses performed this week

                </p>

            </div>

            <ResponsiveContainer

                width="100%"

                height={320}

            >

                <LineChart data={data}>

                    <CartesianGrid

                        strokeDasharray="3 3"

                        stroke="#334155"

                    />

                    <XAxis

                        dataKey="day"

                        stroke="#94A3B8"

                    />

                    <YAxis

                        stroke="#94A3B8"

                    />

                    <Tooltip

                        contentStyle={{

                            background: "#0F172A",

                            border: "1px solid #334155",

                            borderRadius: "12px",

                            color: "#fff"

                        }}

                    />

                    <Line

                        type="monotone"

                        dataKey="scans"

                        stroke="#3B82F6"

                        strokeWidth={4}

                        dot={{

                            r: 5

                        }}

                    />

                </LineChart>

            </ResponsiveContainer>

        </Card>

    );

};

export default TrendChart;