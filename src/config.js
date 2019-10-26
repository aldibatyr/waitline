require('dotenv');

export default {
  API_ENDPOINT: process.env.API_ENDPOINT || 'https://immense-thicket-82721.herokuapp.com/api',
  TOKEN_KEY: process.env.TOKEN_KEY || 'waitline-app-auth-token'
}