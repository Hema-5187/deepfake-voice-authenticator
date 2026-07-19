import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
} from "react-icons/fa";

const AudioPlayer = ({ file }) => {

  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {

    if (!file) return;

    const audio = new Audio(URL.createObjectURL(file));

    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    return () => {

      audio.pause();

      URL.revokeObjectURL(audio.src);

    };

  }, [file]);

  const togglePlay = () => {

    if (!audioRef.current) return;

    if (playing) {

      audioRef.current.pause();

      setPlaying(false);

    } else {

      audioRef.current.play();

      setPlaying(true);

    }

  };

  const handleSeek = (e) => {

    const value = Number(e.target.value);

    audioRef.current.currentTime = value;

    setCurrentTime(value);

  };

  const formatTime = (time) => {

    const min = Math.floor(time / 60);

    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

  };

  if (!file) return null;

  return (

    <div className="mt-6 bg-slate-800 rounded-xl p-5">

      <h2 className="text-white font-semibold mb-5">

        Audio Preview

      </h2>

      <div className="flex items-center gap-5">

        <button

          onClick={togglePlay}

          className="w-12 h-12 rounded-full bg-blue-600 flex justify-center items-center"

        >

          {

            playing

              ? <FaPause />

              : <FaPlay />

          }

        </button>

        <FaVolumeUp className="text-slate-300" />

        <input

          type="range"

          min={0}

          max={duration}

          value={currentTime}

          onChange={handleSeek}

          className="flex-1"

        />

        <span className="text-slate-300">

          {formatTime(currentTime)}

          {" / "}

          {formatTime(duration)}

        </span>

      </div>

    </div>

  );

};

export default AudioPlayer;