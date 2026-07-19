import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Card from "../Common/Card";

const steps = [

    "Uploading Audio",

    "Preprocessing Audio",

    "Extracting Features",

    "Generating Embeddings",

    "Running AI Model",

    "Generating Prediction"

];

const AIProcessing = () => {

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentStep((prev) => {

                if (prev < steps.length - 1) {

                    return prev + 1;

                }

                return prev;

            });

        }, 700);

        return () => clearInterval(timer);

    }, []);

    return (

        <Card className="mt-8">

            <h2 className="text-2xl font-bold text-white mb-8">

                🤖 AI Detection Engine

            </h2>

            <div className="space-y-6">

                {

                    steps.map((step, index) => (

                        <div key={step}>

                            <div className="flex justify-between mb-2">

                                <span className="text-slate-300">

                                    {step}

                                </span>

                                {

                                    index <= currentStep && (

                                        <span className="text-green-400">

                                            ✓

                                        </span>

                                    )

                                }

                            </div>

                            <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">

                                <motion.div

                                    initial={{ width: 0 }}

                                    animate={{

                                        width:

                                            index < currentStep

                                                ? "100%"

                                                : index === currentStep

                                                ? "100%"

                                                : "0%"

                                    }}

                                    transition={{

                                        duration: 0.6

                                    }}

                                    className="h-full bg-blue-500"

                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

};

export default AIProcessing;