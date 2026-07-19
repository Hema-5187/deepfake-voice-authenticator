import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

import Card from "../Common/Card";

const data = [

    {
        name: "Authentic",
        value: 76
    },

    {
        name: "AI Generated",
        value: 24
    }

];

const COLORS = [

    "#22C55E",

    "#EF4444"

];

const PieChartCard = () => {

    return (

        <Card>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Detection Ratio

                </h2>

                <p className="text-slate-400 mt-2">

                    Authentic vs AI Generated

                </p>

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

                            borderRadius: "12px",

                            color: "#fff"

                        }}

                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </Card>

    );

};

export default PieChartCard;