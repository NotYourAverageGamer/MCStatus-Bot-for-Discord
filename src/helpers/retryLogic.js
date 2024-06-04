const { checkInternetConnection } = require('./checkInternet');
const { getCurrentDateTime } = require('./dateTime');

// Function to handle internet connection check and retry logic
async function handleInternetCheckAndRetry(runScript) {
  // Check if internet connection is available
  const isInternetConnected = await checkInternetConnection();

  // If internet connection is not available, log error and schedule retry in 15 minutes
  if (!isInternetConnected) {
    console.error(
      `${getCurrentDateTime()}: \x1b[31mInternet connection is not available. Retrying in 15 minutes...\x1b[0m`
    );
    setTimeout(runScript, 15 * 60 * 1000); // Retry after 15 minutes
    return false; // Indicate that internet connection is not available
  }

  // If internet connection is available, return true
  return true;
}

// Export the function for external use
module.exports = { handleInternetCheckAndRetry };
