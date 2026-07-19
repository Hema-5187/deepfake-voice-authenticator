import { motion } from "framer-motion";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaRobot,
    FaClock,
    FaChartLine,
    FaDownload,
    FaRedo,
    FaShieldAlt,
} from "react-icons/fa";

import Card from "../Common/Card";
import Button from "../Common/Button";
import ConfidenceGauge from "./ConfidenceGauge";

import { generatePDFReport } from "../../utils/pdfReport";

const PredictionCard = ({ result, onReset }) => {

    if (!result) return null;

    const isReal = result.prediction === "REAL";

    const probability = Number(
        result.probability ?? 0
    ).toFixed(2);

    const processingTime = Number(
        result.processing_time_ms ?? 0
    );

    return (

        <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.5 }}

            className="mt-10"

        >

            <Card>

                {/* ========================= */}

                {/* Header */}

                {/* ========================= */}

                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                    <div className="flex items-center gap-5">

                        {

                            isReal ?

                                <FaCheckCircle

                                    className="text-green-500"

                                    size={65}

                                />

                                :

                                <FaTimesCircle

                                    className="text-red-500"

                                    size={65}

                                />

                        }

                        <div>

                            <h2 className="text-3xl font-bold text-white">

                                {

                                    isReal

                                        ?

                                        "Authentic Voice"

                                        :

                                        "AI Generated Voice"

                                }

                            </h2>

                            <p className="text-slate-400 mt-2">

                                AI Voice Detection Completed Successfully

                            </p>

                        </div>

                    </div>

                    <span

                        className={`

                            px-6

                            py-3

                            rounded-full

                            font-semibold

                            text-lg

                            ${

                                isReal

                                    ?

                                    "bg-green-500/20 text-green-400"

                                    :

                                    "bg-red-500/20 text-red-400"

                            }

                        `}

                    >

                        {

                            result.confidence ||

                            "Unknown"

                        }

                    </span>

                </div>

                {/* ========================= */}

                {/* Confidence */}

                {/* ========================= */}

                <div className="grid lg:grid-cols-2 gap-10 mt-10">

                    <ConfidenceGauge

                        probability={Number(probability)}

                    />
                                        {/* ========================= */}
                    {/* AI Assessment */}
                    {/* ========================= */}

                    <div>

                        <h3 className="text-2xl font-bold text-white mb-5">

                            AI Assessment

                        </h3>

                        <p className="text-slate-300 leading-8">

                            {

                                isReal

                                    ?

                                    "The uploaded voice appears authentic. The AI model found no significant indicators of synthetic speech generation. The acoustic characteristics, temporal consistency, and learned embedding closely match natural human speech."

                                    :

                                    "The uploaded voice exhibits characteristics commonly associated with AI-generated speech. The embedding contains patterns frequently observed in synthetic voice models. Manual verification is recommended before trusting this recording."

                            }

                        </p>

                        <div className="mt-8 bg-slate-800 rounded-2xl p-6">

                            <div className="flex items-center gap-3">

                                <FaShieldAlt className="text-cyan-400 text-2xl"/>

                                <h4 className="text-xl text-white font-semibold">

                                    Detection Summary

                                </h4>

                            </div>

                            <ul className="mt-5 space-y-3 text-slate-300">

                                <li>

                                    ✓ AI model completed feature extraction successfully.

                                </li>

                                <li>

                                    ✓ Audio preprocessing completed.

                                </li>

                                <li>

                                    ✓ Voice embedding generated.

                                </li>

                                <li>

                                    ✓ Machine Learning classification completed.

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

                {/* ========================= */}
                {/* Statistics */}
                {/* ========================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">

                    <div className="bg-slate-800 rounded-2xl p-6">

                        <FaRobot
                            className="text-blue-400 text-2xl mb-4"
                        />

                        <p className="text-slate-400">

                            AI Model

                        </p>

                        <h3 className="text-white font-semibold mt-2">

                            {result.model_name || "Wav2Vec2 + SVM"}

                        </h3>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-6">

                        <FaChartLine
                            className="text-yellow-400 text-2xl mb-4"
                        />

                        <p className="text-slate-400">

                            Probability

                        </p>

                        <h3 className="text-white font-semibold mt-2">

                            {probability}%

                        </h3>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-6">

                        <FaClock
                            className="text-green-400 text-2xl mb-4"
                        />

                        <p className="text-slate-400">

                            Processing Time

                        </p>

                        <h3 className="text-white font-semibold mt-2">

                            {(processingTime / 1000).toFixed(2)} sec

                        </h3>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-6">

                        <FaShieldAlt
                            className="text-purple-400 text-2xl mb-4"
                        />

                        <p className="text-slate-400">

                            Detection

                        </p>

                        <h3 className="text-white font-semibold mt-2">

                            {

                                isReal

                                    ?

                                    "Authentic"

                                    :

                                    "Synthetic"

                            }

                        </h3>

                    </div>

                </div>
                                {/* ========================= */}
                {/* Action Buttons */}
                {/* ========================= */}

                <div className="flex flex-wrap justify-end gap-4 mt-12">

                    {

                        onReset &&

                        <Button

                            onClick={onReset}

                            className="bg-slate-700 hover:bg-slate-600"

                        >

                            <FaRedo className="mr-2" />

                            Analyze Another

                        </Button>

                    }

                    <Button

                        onClick={() =>

                            generatePDFReport(

                                result,

                                result.filename || "audio"

                            )

                        }

                    >

                        <FaDownload className="mr-2" />

                        Download Report

                    </Button>

                </div>

                {/* ========================= */}
                {/* Footer */}
                {/* ========================= */}

                <div className="mt-10 border-t border-slate-700 pt-6">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">

                        <div>

                            <p className="text-slate-300 font-semibold">

                                Deepfake Voice Authenticator

                            </p>

                            <p className="text-slate-500 text-sm">

                                AI Powered Voice Verification System

                            </p>

                        </div>

                        <div>

                            <span className="text-xs text-slate-500">

                                Powered by Wav2Vec2 • Machine Learning • FastAPI

                            </span>

                        </div>

                    </div>

                </div>

            </Card>

        </motion.div>

    );

};

export default PredictionCard;