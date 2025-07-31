const { checkInternetConnection } = require('./checkInternet');
const { getCurrentDateTime } = require('./dateTime');

async function handleInternetCheckAndRetry(runScript) {
  const isInternetConnected = await checkInternetConnection();

  if (!isInternetConnected) {
    console.error(
      `${getCurrentDateTime()}: \x1b[31mInternet connection is not available. Retrying in 15 minutes...\x1b[0m`
    );
    setTimeout(runScript, 15 * 60 * 1000);
    return false;
  }

  return true;
}

module.exports = { handleInternetCheckAndRetry };
