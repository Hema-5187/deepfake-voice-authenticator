import { useEffect, useRef, useState } from "react";
import { convertBlobToWav } from "../../utils/audioConverter";

import {
    FaMicrophone,
    FaStop,
    FaPlay,
    FaPause,
    FaTrash,
    FaWaveSquare,
    FaBrain,
} from "react-icons/fa";

import toast from "react-hot-toast";

import Button from "../Common/Button";
import Card from "../Common/Card";
import LiveWaveform from "./LiveWaveform";

const LiveRecorder = ({ onRecordingComplete }) => {

    const mediaRecorderRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const audioRef = useRef(null);

    const [recording, setRecording] = useState(false);
    const [playing, setPlaying] = useState(false);

    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        let timer;

        if (recording) {

            timer = setInterval(() => {

                setSeconds((prev) => prev + 1);

            }, 1000);

        }

        return () => clearInterval(timer);

    }, [recording]);

    useEffect(() => {

        return () => {

            if (audioURL) {

                URL.revokeObjectURL(audioURL);

            }

            if (streamRef.current) {

                streamRef.current
                    .getTracks()
                    .forEach(track => track.stop());

            }

        };

    }, [audioURL]);

    const formatTime = (time) => {

        const min = Math.floor(time / 60);
        const sec = time % 60;

        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

    };

    const startRecording = async () => {

        try {

            const stream = await navigator.mediaDevices.getUserMedia({

                audio: true,

            });

            streamRef.current = stream;

            const options = {};

            if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
                options.mimeType = "audio/webm;codecs=opus";
            } else if (MediaRecorder.isTypeSupported("audio/webm")) {
                options.mimeType = "audio/webm";
            }

            const recorder = new MediaRecorder(stream, options);

            mediaRecorderRef.current = recorder;
            setMediaRecorder(recorder);

            chunksRef.current = [];

            recorder.ondataavailable = (event) => {

                if (event.data.size > 0) {

                    chunksRef.current.push(event.data);

                }

            };

            recorder.onstop = () => {

                const blob = new Blob(chunksRef.current, {

                    type: "audio/webm",

                });

                const url = URL.createObjectURL(blob);

                setAudioBlob(blob);
                setAudioURL(url);

                stream
                    .getTracks()
                    .forEach(track => track.stop());

                toast.success("Recording completed.");

            };

            recorder.start();

            setSeconds(0);
            setRecording(true);

            toast.success("Recording started.");

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to access microphone.");

        }

    };

    const stopRecording = () => {

        if (!mediaRecorderRef.current) return;

        mediaRecorderRef.current.stop();

        setRecording(false);

    };

    const togglePlayback = () => {

        if (!audioRef.current) return;

        if (playing) {

            audioRef.current.pause();

        }

        else {

            audioRef.current.play();

        }

    };

    const analyzeRecording = async () => {

        if (!audioBlob) {
            toast.error("Record audio first.");
            return;
        }

        const loadingToast = toast.loading(
            "Preparing recording..."
        );

        try {

            // Convert WebM -> WAV
            const wavFile = await convertBlobToWav(audioBlob);

            toast.success(
                "Recording converted successfully.",
                {
                    id: loadingToast,
                }
            );

            if (onRecordingComplete) {
                await onRecordingComplete(wavFile);
            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to process recording.",
                {
                    id: loadingToast,
                }
            );

        }

    };

    const deleteRecording = () => {

        if (audioURL) {

            URL.revokeObjectURL(audioURL);

        }

        setAudioBlob(null);
        setAudioURL(null);
        setPlaying(false);
        setSeconds(0);

        toast.success("Recording removed.");

    };

    return (

        <Card className="mt-8">

            <div className="flex items-center gap-3 mb-5">

                <FaWaveSquare className="text-blue-500 text-3xl" />

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Live Voice Detection

                    </h2>

                    <p className="text-slate-400">

                        Record your voice and let AI analyze it.

                    </p>

                </div>

            </div>

            <div className="flex flex-wrap gap-4">

                {

                    !recording ?

                        <Button onClick={startRecording}>

                            <FaMicrophone className="mr-2" />

                            Start Recording

                        </Button>

                        :

                        <Button

                            onClick={stopRecording}

                            className="bg-red-600 hover:bg-red-700"

                        >

                            <FaStop className="mr-2" />

                            Stop Recording

                        </Button>

                }

                {

                    audioBlob &&

                    <Button

                        onClick={deleteRecording}

                        className="bg-slate-700 hover:bg-slate-600"

                    >

                        <FaTrash className="mr-2" />

                        Delete

                    </Button>

                }

            </div>

            {

                recording && (

                    <div className="mt-8">
                        <LiveWaveform

                            recording={recording}

                        />

                        <div className="flex items-center gap-3">

                            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />

                            <span className="text-red-400 font-semibold">

                                Recording...

                            </span>

                        </div>

                        <p className="text-white mt-3 text-xl">

                            {formatTime(seconds)}

                        </p>

                    </div>

                )

            }

            {

                audioURL && (

                    <div className="mt-8">

                        <audio

                            ref={audioRef}

                            src={audioURL}

                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            onEnded={() => setPlaying(false)}

                        />

                        <div className="flex flex-wrap gap-4">

                            <Button onClick={togglePlayback}>

                                {

                                    playing ?

                                        <FaPause className="mr-2" />

                                        :

                                        <FaPlay className="mr-2" />

                                }

                                {

                                    playing ?

                                        "Pause"

                                        :

                                        "Play"

                                }

                            </Button>

                            <Button onClick={analyzeRecording}>

                                <FaBrain className="mr-2" />

                                Analyze Recording

                            </Button>

                        </div>

                        <div className="mt-6 bg-slate-800 rounded-xl p-4">

                            <p className="text-slate-300">

                                Your recording is ready for AI analysis.

                            </p>

                        </div>

                    </div>

                )

            }

        </Card>

    );

};

export default LiveRecorder;