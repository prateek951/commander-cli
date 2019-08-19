const axios = require('axios');

const baseURL = 'http://redmine.successive.in/';
const key = 'enter your api key here';

const asyncCall = async (method, url, userData) => {
  try {
    return await axios({
      method,
      url: `${baseURL}${url}`,
      data: userData,
      headers: {
        'X-Redmine-API-Key': key,
      }
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = asyncCall;
