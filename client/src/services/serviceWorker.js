import Axios from 'axios';

const BASE_URL = "http://localhost:5000";
export const createContactMessage = async (msgDetails) => {
    const task = await Axios.post(`${BASE_URL}/api/submit-form`, msgDetails);
    const response = task.data;
    return response;
}

export const createTransaction = async (transactionDetails) => {
    const task = await Axios.post(`${BASE_URL}/api/add-transaction`, transactionDetails);
    const response = task.data;
    return response;
}

export const getAllTransactions = async () => {
    const task = await Axios.get(`${BASE_URL}/api/all-transactions`);
    const response = task.data;
    return response;
}