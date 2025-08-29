import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(userData).forEach(key => {
      if (key === 'likes') {
        formData.append(key, JSON.stringify(userData[key]));
      } else if (key === 'cover' && userData[key]) {
        formData.append(key, userData[key]);
      } else if (userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    });

    return axios.post(`${BASE_URL}/auth/register/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  login: (credentials) => axios.post(`${BASE_URL}/auth/token/`, credentials),
  
  getProfile: () => axios.get(`${BASE_URL}/users/me/`, {
    headers: getAuthHeaders(),
  }),
  
  updateProfile: (userData) => axios.patch(`${BASE_URL}/users/me/`, userData, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  }),
};

// Dating API calls
export const datingAPI = {
  getFeed: () => axios.get(`${BASE_URL}/feed/`, {
    headers: getAuthHeaders(),
  }),
  
  swipe: (targetId, action) => axios.post(`${BASE_URL}/swipe/`, {
    target_id: targetId,
    action: action, // 'like' or 'pass'
  }, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  }),
  
  getMatches: () => axios.get(`${BASE_URL}/matches/`, {
    headers: getAuthHeaders(),
  }),
};

// Upload API
export const uploadAPI = {
  uploadFile: (file, setAsCover = false) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const url = setAsCover 
      ? `${BASE_URL}/upload/?set_as_cover=true` 
      : `${BASE_URL}/upload/`;
    
    return axios.post(url, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default { authAPI, datingAPI, uploadAPI };
