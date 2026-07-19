import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
    Cell,
    LabelList,
} from "recharts";

import { motion } from "framer-motion";

import Card from "../Common/Card";

const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#EF4444",
    "#F59E0B",
];

const BarChartCard = ({ stats }) => {

    const data = [

        {
            name: "Scans",
            value: stats.total_scans,
        },

        {
            name: "REAL",
            value: stats.real_predictions,
        },

        {
            name: "FAKE",
            value: stats.fake_predictions,
        },

        {
            name: "Confidence",
            value: Number(stats.average_confidence),
        },

    ];

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.4 }}

        >

            <Card>

                <div className="mb-6">

                    <h2 className="text-2xl font-bold text-white">

                        Detection Overview

                    </h2>

                    <p className="text-slate-400 mt-2">

                        Summary of AI detection statistics

                    </p>

                </div>
 <ResponsiveContainer width="100%" height={320}>

    <BarChart
        data={data}
        margin={{
            top: 25,
            right: 20,
            left: 10,
            bottom: 10,
        }}
    >

        <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
        />

        <XAxis
            dataKey="name"
            stroke="#CBD5E1"
            tick={{
                fill: "#CBD5E1",
                fontSize: 13,
                fontWeight: 600,
            }}
        />

        <YAxis
            stroke="#CBD5E1"
            tick={{
                fill: "#CBD5E1",
                fontSize: 13,
            }}
        />

        <Tooltip
            cursor={{
                fill: "rgba(59,130,246,0.08)",
            }}
            contentStyle={{
                background: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#FFFFFF",
            }}
            labelStyle={{
                color: "#FFFFFF",
                fontWeight: "bold",
            }}
            itemStyle={{
                color: "#FFFFFF",
            }}
        />

        <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
        >

            <LabelList
                dataKey="value"
                position="top"
                fill="#FFFFFF"
                fontSize={14}
                fontWeight="bold"
            />

            {
                data.map((entry, index) => (

                    <Cell
                        key={entry.name}
                        fill={COLORS[index]}
                    />

                ))
            }

        </Bar>

    </BarChart>

</ResponsiveContainer>

            </Card>

        </motion.div>

    );

};

export default BarChartCard;