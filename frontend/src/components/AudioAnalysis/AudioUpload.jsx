import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "../Common/Card";
import Button from "../Common/Button";
import LoadingSpinner from "../Common/LoadingSpinner";

import PredictionCard from "./PredictionCard";
import FileDetails from "./FileDetails";
import AudioWaveform from "./AudioWaveform";
import LiveRecorder from "./LiveRecorder";
import AIProcessing from "./AIProcessing";
import AudioTabs from "./AudioTabs";

import { analyzeAudio } from "../../services/analysis";

const AudioUpload = () => {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [uploadProgress, setUploadProgress] = useState(0);

    const [activeTab, setActiveTab] = useState("upload");

    const [source, setSource] = useState("upload");

    // =============================
    // Drag & Drop Upload
    // =============================

    const onDrop = (acceptedFiles) => {

        if (!acceptedFiles.length) return;

        setFile(acceptedFiles[0]);

        setResult(null);

        setUploadProgress(0);

    };

    const {

        getRootProps,

        getInputProps,

        isDragActive,

    } = useDropzone({

        accept: {

            "audio/*": [],

        },

        multiple: false,

        onDrop,

    });

    // =============================
    // Analyze Uploaded Audio
    // =============================

    const handleAnalyze = async () => {

        if (!file) {

            toast.error("Please select an audio file.");

            return;

        }

        try {

            setLoading(true);

            setUploadProgress(0);

            const response = await analyzeAudio(

                file,

                (progress) => {

                    setUploadProgress(progress);

                }

            );

            setResult(response);

            toast.success("Analysis completed successfully.");

        }

        catch (err) {

            console.error(err);

            toast.error(

                err?.response?.data?.detail ||

                "Analysis failed."

            );

        }

        finally {

            setLoading(false);

            setUploadProgress(100);

        }

    };

    // =============================
    // Analyze Live Recording
    // =============================

    const handleRecordingComplete = async (blob) => {

        try {

            setLoading(true);

            setSource("live");

            setUploadProgress(0);

            const response = await analyzeAudio(

                blob,

                (progress) => {

                    setUploadProgress(progress);

                }

            );

            setResult(response);

            toast.success("Recording analyzed successfully.");

        }

        catch (err) {

            console.error(err);

            toast.error(

                err?.response?.data?.detail ||

                "Analysis failed."

            );

        }

        finally {

            setLoading(false);

            setUploadProgress(100);

        }

    };

    // =============================
    // Reset
    // =============================

    const removeFile = () => {

        setFile(null);

        setResult(null);

        setSource("upload");

        setUploadProgress(0);

    };

    return (

        <div className="max-w-6xl mx-auto space-y-8">

            <Card>

                {/* Header */}

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-white">

                        AI Voice Detection

                    </h1>

                    <p className="text-slate-400 mt-3">

                        Detect whether a voice recording is authentic

                        or AI-generated using advanced AI models.

                    </p>

                </div>

                {/* Tabs */}

                <AudioTabs

                    activeTab={activeTab}

                    setActiveTab={setActiveTab}

                />

                <AnimatePresence mode="wait">

                    {

                        activeTab === "upload" && (

                            <motion.div

                                key="upload"

                                initial={{

                                    opacity: 0,

                                    x: -30,

                                }}

                                animate={{

                                    opacity: 1,

                                    x: 0,

                                }}

                                exit={{

                                    opacity: 0,

                                    x: 30,

                                }}

                                transition={{

                                    duration: 0.3,

                                }}

                            >

                                {/* Upload Area */}

                                <motion.div

                                    whileHover={{

                                        scale: 1.01,

                                    }}

                                    {...getRootProps()}

                                    className={`
                                        border-2
                                        border-dashed
                                        rounded-2xl
                                        p-14
                                        text-center
                                        cursor-pointer
                                        transition-all

                                        ${

                                            isDragActive

                                                ? "border-blue-500 bg-blue-500/10"

                                                : "border-slate-700 hover:border-blue-500"

                                        }

                                    `}
                                >

                                    <input {...getInputProps()} />

                                    <div className="text-6xl mb-5">

                                        🎤

                                    </div>

                                    <h2 className="text-3xl font-bold text-white">

                                        Drag & Drop Audio

                                    </h2>

                                    <p className="text-slate-400 mt-3">

                                        or click to browse your computer

                                    </p>

                                    <p className="text-xs text-slate-500 mt-6">

                                        Supported formats:

                                        WAV • MP3 • M4A • FLAC

                                    </p>

                                </motion.div>
                                                                {/* Uploaded File */}

                                {

                                    file && (

                                        <motion.div

                                            initial={{

                                                opacity: 0,

                                                y: 20,

                                            }}

                                            animate={{

                                                opacity: 1,

                                                y: 0,

                                            }}

                                            transition={{

                                                duration: 0.3,

                                            }}

                                        >

                                            <FileDetails

                                                file={file}

                                            />

                                            <AudioWaveform

                                                file={file}

                                            />

                                            {/* Upload Progress */}

                                            {

                                                loading && (

                                                    <div className="mt-8">

                                                        <div className="flex justify-between mb-2">

                                                            <span className="text-slate-300">

                                                                Uploading & Processing...

                                                            </span>

                                                            <span className="text-white font-semibold">

                                                                {uploadProgress}%

                                                            </span>

                                                        </div>

                                                        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

                                                            <motion.div

                                                                initial={{

                                                                    width: 0,

                                                                }}

                                                                animate={{

                                                                    width: `${uploadProgress}%`,

                                                                }}

                                                                className="h-full bg-blue-500"

                                                            />

                                                        </div>

                                                    </div>

                                                )

                                            }

                                            {/* Buttons */}

                                            <div className="flex flex-wrap gap-4 mt-8">

                                                <Button

                                                    onClick={handleAnalyze}

                                                    disabled={loading || !file}

                                                >

                                                    {

                                                        loading

                                                            ?

                                                            "Analyzing..."

                                                            :

                                                            "Analyze Audio"

                                                    }

                                                </Button>

                                                <Button

                                                    onClick={removeFile}

                                                    disabled={loading}

                                                    className="bg-red-600 hover:bg-red-700"

                                                >

                                                    Remove File

                                                </Button>

                                            </div>

                                        </motion.div>

                                    )

                                }

                            </motion.div>

                        )

                    }

                </AnimatePresence>
                                {/* =============================
                    Live Recorder
                ============================== */}

                <AnimatePresence mode="wait">

                    {

                        activeTab === "live" && (

                            <motion.div

                                key="live"

                                initial={{

                                    opacity: 0,

                                    x: 30,

                                }}

                                animate={{

                                    opacity: 1,

                                    x: 0,

                                }}

                                exit={{

                                    opacity: 0,

                                    x: -30,

                                }}

                                transition={{

                                    duration: 0.35,

                                }}

                            >

                                <LiveRecorder

                                    onRecordingComplete={

                                        handleRecordingComplete

                                    }

                                />

                            </motion.div>

                        )

                    }

                </AnimatePresence>

            </Card>

            {/* =============================
                AI Processing Animation
            ============================== */}

            {

                loading && (

                    <motion.div

                        initial={{

                            opacity: 0,

                            y: 20,

                        }}

                        animate={{

                            opacity: 1,

                            y: 0,

                        }}

                    >

                        <AIProcessing />

                    </motion.div>

                )

            }

            {/* =============================
                Prediction Result
            ============================== */}

            {

                result && (

                    <motion.div

                        initial={{

                            opacity: 0,

                            y: 20,

                        }}

                        animate={{

                            opacity: 1,

                            y: 0,

                        }}

                        transition={{

                            duration: 0.4,

                        }}

                    >

                        <PredictionCard

                            result={result}

                            source={source}

                            onReset={removeFile}

                        />

                    </motion.div>

                )

            }
                        {/* =============================
                Footer
            ============================== */}

            <motion.div

                initial={{

                    opacity: 0,

                }}

                animate={{

                    opacity: 1,

                }}

                transition={{

                    delay: 0.3,

                }}

                className="

                    mt-12

                    border-t

                    border-slate-700

                    pt-6

                "

            >

                <div

                    className="

                        flex

                        flex-col

                        md:flex-row

                        justify-between

                        items-center

                        gap-4

                    "

                >

                    <div>

                        <h3 className="text-lg font-semibold text-white">

                            Deepfake Voice Authenticator

                        </h3>

                        <p className="text-slate-400 text-sm mt-1">

                            AI-powered deepfake voice detection using
                            Wav2Vec2 embeddings, Machine Learning,
                            and FastAPI.

                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-slate-500 text-sm">

                            Version 1.0

                        </p>

                        <p className="text-slate-500 text-sm">

                            Secure • Fast • Privacy Focused

                        </p>

                    </div>

                </div>

            </motion.div>

        </div>

    );

};

export default AudioUpload;