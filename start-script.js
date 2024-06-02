// Importing required modules
const { exec } = require('child_process');
// Importing axios for making HTTP requests
const axios = require('axios');
const { error } = require('console');

// Flag to track if it's the first execution of the script
let isFirstExecution = true;

// Function to clear the console
function clearConsole() {
  console.clear();
}

// Function to get the current date and time in Australia/Sydney timezone
function getCurrentDateTime() {
  const now = new Date();
  const dateStamp = now.toLocaleDateString('en-AU', options);
  const timeStamp = now.toLocaleTimeString('en-AU', options);
  return `${dateStamp} @ ${timeStamp}`;
}

// Function to check internet connection asynchronously (Got over the long ERR messages whenever there was an issue with the internet connection.. there's probably a better solution to this)
async function checkInternetConnection() {
  try {
    // Sending a GET request to Cloudflare's website
    await axios.get('http://www.cloudflare.com');
    // If successful, return true
    return true;
  } catch (error) {
    // If an error occurs (e.g., no internet connection), return false
    return false;
  }
}

// Function to run the script
async function runScript() {
  // If it's the first execution of the script
  if (isFirstExecution) {
    // Clear the console
    clearConsole();
    // Set the flag to false
    isFirstExecution = false;
  }

  // Check internet connection
  const isInternetConnected = await checkInternetConnection();

  // If internet connection is not available
  if (!isInternetConnected) {
    // Get current timestamp
    const timestamp = new Date().toLocaleString();
    // Log an error message
    console.error(
      getCurrentDateTime() +
        ': \x1b[31mInternet connection is not available. Retrying in 15 minutes...\x1b[0m'
    );
    // Retry running the script after 15 minutes
    setTimeout(runScript, 15 * 60 * 1000);
    // Exit the function
    return;
  }

  // Execute the 'main.js' script
  exec('node main.js', (error, stdout, stderr) => {
    // If an error occurs
    if (error) {
      console.error(
        getCurrentDateTime() + ': \x1b[31mError executing main.js:\x1b[0m',
        error
      );
      // Exit the function
      return;
    }
    // Log the standard output
    console.log(stdout);
    // Log the standard error
    console.error(stderr);
  });

  // Schedule the next execution of the script after 15 minutes
  setTimeout(runScript, 15 * 60 * 1000);
}

// Start running the script
runScript();
