import axios, { Axios } from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.API_URL
});

interface FetchDataProps {
    apiUrl: string
}

interface PostProps {
    apiUrl: string,
    data: any
}

export async function apiPost({apiUrl, data}: PostProps) {
    const result = await AxiosInstance.post(apiUrl, data)
    return result;
}

export async function fetchData({apiUrl}: FetchDataProps) {
    const result = await AxiosInstance.get(apiUrl);
    return result;
}

export default AxiosInstance;