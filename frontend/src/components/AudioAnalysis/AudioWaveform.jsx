import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import {
    FaPlay,
    FaPause,
    FaVolumeUp,
} from "react-icons/fa";

import Card from "../Common/Card";

const AudioWaveform = ({ file }) => {

    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);

    const [playing, setPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);

    const [volume, setVolume] = useState(1);

    useEffect(() => {

        if (!file) return;

        const audioURL = URL.createObjectURL(file);

        wavesurferRef.current = WaveSurfer.create({

            container: waveformRef.current,

            waveColor: "#334155",

            progressColor: "#3B82F6",

            cursorColor: "#FFFFFF",

            barWidth: 3,

            barGap: 2,

            barRadius: 3,

            height: 100,

            normalize: true,

            responsive: true,

        });

        wavesurferRef.current.load(audioURL);

        wavesurferRef.current.on("ready", () => {

            setDuration(wavesurferRef.current.getDuration());

        });

        wavesurferRef.current.on("audioprocess", () => {

            setCurrentTime(wavesurferRef.current.getCurrentTime());

        });

        wavesurferRef.current.on("seek", () => {

            setCurrentTime(wavesurferRef.current.getCurrentTime());

        });

        wavesurferRef.current.on("play", () => {

            setPlaying(true);

        });

        wavesurferRef.current.on("pause", () => {

            setPlaying(false);

        });

        wavesurferRef.current.on("finish", () => {

            setPlaying(false);

        });

        return () => {

            wavesurferRef.current.destroy();

            URL.revokeObjectURL(audioURL);

        };

    }, [file]);

    const togglePlayback = () => {

        if (!wavesurferRef.current) return;

        wavesurferRef.current.playPause();

    };

    const handleVolume = (e) => {

        const value = Number(e.target.value);

        setVolume(value);

        if (wavesurferRef.current) {

            wavesurferRef.current.setVolume(value);

        }

    };

    const formatTime = (seconds) => {

        const mins = Math.floor(seconds / 60);

        const secs = Math.floor(seconds % 60);

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    };

    if (!file) return null;

    return (

        <Card className="mt-8">

            <h2 className="text-2xl font-bold text-white mb-6">

                Audio Waveform

            </h2>

            <div

                ref={waveformRef}

                className="rounded-xl overflow-hidden"

            />

            <div className="flex items-center justify-between mt-6 flex-wrap gap-4">

                <button

                    onClick={togglePlayback}

                    className="

                    w-12

                    h-12

                    rounded-full

                    bg-blue-600

                    hover:bg-blue-700

                    flex

                    justify-center

                    items-center

                    text-white

                    "

                >

                    {

                        playing

                            ?

                            <FaPause />

                            :

                            <FaPlay />

                    }

                </button>

                <div className="text-slate-300">

                    {formatTime(currentTime)}

                    {" / "}

                    {formatTime(duration)}

                </div>

                <div className="flex items-center gap-3">

                    <FaVolumeUp className="text-white"/>

                    <input

                        type="range"

                        min="0"

                        max="1"

                        step="0.01"

                        value={volume}

                        onChange={handleVolume}

                        className="w-32"

                    />

                </div>

            </div>

        </Card>

    );

};

export default AudioWaveform;