import toWav from "audiobuffer-to-wav";

export const convertBlobToWav = async (audioBlob) => {

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    const audioContext = new AudioContextClass();

    try {

        const arrayBuffer =
            await audioBlob.arrayBuffer();

        const audioBuffer =
            await audioContext.decodeAudioData(
                arrayBuffer
            );

        const wavBuffer = toWav(audioBuffer);

        const wavBlob = new Blob(
            [wavBuffer],
            {
                type: "audio/wav",
            }
        );

        return new File(
            [wavBlob],
            "recording.wav",
            {
                type: "audio/wav",
                lastModified: Date.now(),
            }
        );

    } finally {

        await audioContext.close();

    }

};