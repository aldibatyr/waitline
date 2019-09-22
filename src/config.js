require('dotenv');

export default {
  API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:8000/api',
  TOKEN_KEY: process.env.TOKEN_KEY || 'waitline-app-auth-token'
}