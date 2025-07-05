// API Configuration utility
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'https://social-media-h9il.onrender.com';
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