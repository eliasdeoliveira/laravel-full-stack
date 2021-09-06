import axios from 'axios';
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false,
});

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    httpsAgent: agent
});

export default api;