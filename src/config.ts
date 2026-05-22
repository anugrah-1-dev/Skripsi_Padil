// Centralized API configuration
// Dikontrol via .env.development / .env.production
export const API_BASE_URL = import.meta.env.VITE_API_URL as string;
export const API_SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
