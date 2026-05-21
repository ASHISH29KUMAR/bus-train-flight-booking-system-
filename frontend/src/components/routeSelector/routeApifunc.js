import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getRoutesFromApi = async (
    transportType,
    startCity,
    destination
) => {

    return await axios.post(

        `${BASE_URL}/booking/${transportType}/search`,

        {
            startCity,
            destination
        }

    );
};