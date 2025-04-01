import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
export const getAllNews = async () => {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
};
