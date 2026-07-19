import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

import Card from "../Common/Card";

const COLORS = [

    "#22C55E",

    "#EF4444",

];

const PieChartCard = ({ stats }) => {

    const data = [

        {

            name: "Authentic",

            value: stats.real_predictions,

        },

        {

            name: "AI Generated",

            value: stats.fake_predictions,

        },

    ];

    const total =

        stats.real_predictions +

        stats.fake_predictions;

    const realPercentage =

        total === 0

            ? 0

            : (

                (stats.real_predictions / total) * 100

            ).toFixed(1);

    return (

        <motion.div

            initial={{ opacity: 0, scale: 0.95 }}

            animate={{ opacity: 1, scale: 1 }}

            transition={{ duration: 0.4 }}

        >

            <Card>

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h2 className="text-2xl font-bold text-white">

                            Detection Distribution

                        </h2>

                        <p className="text-slate-400 mt-1">

                            Authentic vs AI Generated

                        </p>

                    </div>

                    <div className="text-right">

                        <h3 className="text-3xl font-bold text-green-400">

                            {realPercentage}%

                        </h3>

                        <p className="text-slate-400 text-sm">

                            Authentic

                        </p>

                    </div>

                </div>

                <ResponsiveContainer

                    width="100%"

                    height={320}

                >

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="value"

                            nameKey="name"

                            innerRadius={70}

                            outerRadius={110}

                            paddingAngle={5}

                            label

                        >

                            {

                                data.map((entry, index) => (

                                    <Cell

                                        key={index}

                                        fill={COLORS[index]}

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip

                            contentStyle={{

                                background: "#0F172A",

                                border: "1px solid #334155",

                                borderRadius: "10px",

                            }}

                        />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-slate-800 rounded-xl p-4 text-center">

                        <h3 className="text-green-400 text-3xl font-bold">

                            {stats.real_predictions}

                        </h3>

                        <p className="text-slate-400 mt-2">

                            Authentic

                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4 text-center">

                        <h3 className="text-red-400 text-3xl font-bold">

                            {stats.fake_predictions}

                        </h3>

                        <p className="text-slate-400 mt-2">

                            AI Generated

                        </p>

                    </div>

                </div>

            </Card>

        </motion.div>

    );

};

export default PieChartCard;