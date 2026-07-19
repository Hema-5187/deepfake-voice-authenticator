import api from "./api";

export const analyzeAudio = async (

    file,

    onUploadProgress

) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(

        "/analysis/predict",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

            onUploadProgress: (progressEvent) => {

                if (onUploadProgress) {

                    const percent = Math.round(

                        (progressEvent.loaded * 100) /

                        progressEvent.total

                    );

                    onUploadProgress(percent);

                }

            },

        }

    );

    return response.data;

};