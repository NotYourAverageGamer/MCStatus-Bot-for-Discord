const axios = require('axios');

async function checkInternetConnection() {
  try {
    await axios.get('https://cloudflare.com');
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { checkInternetConnection };
