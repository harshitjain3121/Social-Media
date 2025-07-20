// API Configuration utility
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'https://social-media-1-9jq1.onrender.com';
};

// Axios configuration with default settings
export const axiosConfig = (token = null) => {
  const config = {
    withCredentials: true,
  };
  
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
  }
  
  return config;
}; 