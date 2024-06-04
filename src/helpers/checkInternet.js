const axios = require('axios');

// Function to check internet connection by making a GET request to a reliable website
async function checkInternetConnection() {
  try {
    await axios.get('https://cloudflare.com'); // Attempt to access Cloudflare
    return true; // Return true if the request is successful
  } catch (error) {
    return false; // Return false if an error occurs (indicating no internet connection)
  }
}

// Export the function for external use
module.exports = { checkInternetConnection };
