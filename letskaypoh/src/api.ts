import axios from 'axios';
import { SeniorInterface, UserInterface, VisitInterface } from './models/interfaces';
 
const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END,
});

export const registerUser = async (userData: UserInterface) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('api: Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (mobile: string) => {
    const userData = ({ "mobile": mobile })
    try {
        const response = await api.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error('api: Error logging in:', error);
        throw error;
    }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        await api.get(`/email?email=${email}`);
        return true;
    } catch (error) {
        console.error('api: Non-existent email:', error);
        return false;
    }
};

export const checkMobileExists = async (mobile: string): Promise<boolean> => {
    try {
        await api.get(`/mobile?mobile=${mobile}`);
        return true;
    } catch (error) {
        console.error('api: Non-existent mobile:', error);
        return false;
    }
};

export const getAllUsersData = async (token: string) => {
    try {
        const response = await api.get(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getUserByIdData = async (userId: string, token: string) => {
    try {
        const response = await api.get(`/user?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getAllSeniorsData = async (token: string) => {
    try {
        const response = await api.get('/seniors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching seniors:', error);
        throw error;
    }
};

export const getSeniorByIdData = async (seniorId: number, token:string): Promise<SeniorInterface> => {
    try {
        const response = await api.get(`/senior?id=${seniorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching senior with ID ${seniorId}:`, error);
        throw error;
    }
};

type PartialSenior = Partial<SeniorInterface>;
export const updateSenior = async (seniorData: PartialSenior, token: string) => {
    try {
        const response = await api.patch('/update_senior', seniorData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating senior:', error);
        throw error;
    }
};

export const getAllVisitsData = async (token: string) => {
    try {
        const response = await api.get('/visits', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching visits:', error);
        throw error;
    }
};

export const getVisitByIdData = async (visitId: number, token: string) => {
    try {
        const response = await api.get(`/visit?id=${visitId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching visit with ID ${visitId}:`, error);
        throw error;
    }
};

export const getUserVisitData = async (user_id: number, token: string) => {
    try {
        const response = await api.get(`/user_visits?id=${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching visits for user ${user_id}:`, error);
        throw error;
    }
};

export const getLatestVisitId = async (token: string) => {
    try {
        const response = await api.get('/visit_id', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error generating visit ID:', error);
        throw error;
    }
};

export const createVisit = async (visitData: VisitInterface, token: string) => {
    try {
        const response = await api.post('/create_visit', visitData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating visit:', error);
        throw error;
    }
};

type PartialVisit = Partial<VisitInterface>;
export const updateVisit = async (visitData: PartialVisit, token: string) => {
    try {
        const response = await api.patch('/update_visit', visitData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating visit:', error);
        throw error;
    }
};

export const getDaysLastVisted = async (senior_id: string, token: string) => {
    try {
        const response = await api.get(`/days?id=${senior_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting days:', error);
        throw error;
    }
};

export const displayDaysLastVisited = (days: number | string) => {
    if (days === "NEVER VISITED") {
        return days;
    } else if (days === 0) {
        return 'Today';
    } else if (days === 1) {
        return 'Yesterday';
    } else {
        return `${String(days)} days ago`;
    }
};