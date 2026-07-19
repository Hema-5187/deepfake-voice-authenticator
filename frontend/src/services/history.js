import api from "./api";

/*
    Get Prediction History
*/

export const getHistory = async () => {

    const response = await api.get("/history");

    return response.data;

};

/*
    Delete Prediction
*/

export const deletePrediction = async (predictionId) => {

    const response = await api.delete(

        `/history/${predictionId}`

    );

    return response.data;

};
