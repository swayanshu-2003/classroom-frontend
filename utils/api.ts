import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // Replace with your API base URL
    timeout: 50000, // Set a timeout limit for requests
    headers: {
        'Content-Type': 'application/json',
        // Add any other custom headers here
    },
});

// Optional: Add request and response interceptors for additional configuration
axiosInstance.interceptors.request.use(
    (config) => {
        // Perform actions before the request is sent (e.g., adding auth tokens)
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Perform actions on successful responses
        return response;
    },
    (error) => {
        // Handle response errors
        return Promise.reject(error);
    }
);

export default axiosInstance;
