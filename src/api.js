import axios from 'axios';

const API = axios.create({
  baseURL: 'https://notekeeper-w30q.onrender.com/api', // change if deployed
});

// Add auth token to all requests if logged in
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
