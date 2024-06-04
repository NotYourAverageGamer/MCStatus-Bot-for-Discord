const { exec } = require('child_process');
const { getCurrentDateTime } = require('../helpers/dateTime.js');
const { handleInternetCheckAndRetry } = require('../helpers/retryLogic.js');

let isFirstExecution = true;

// Function to clear the console
function clearConsole() {
  console.clear();
}

// Function to execute the script
async function runScript() {
  // Clear the console on first execution
  if (isFirstExecution) {
    clearConsole();
    isFirstExecution = false;
  }

  // Check for internet connection and retry if necessary
  const isInternetConnected = await handleInternetCheckAndRetry(runScript);
  if (!isInternetConnected) return;

  // Execute the main script
  exec('node src/bot/main.js', (error, stdout, stderr) => {
    if (error) {
      // Log any errors during execution
      console.error(
        `${getCurrentDateTime()}: \x1b[31mError executing main.js:\x1b[0m`,
        error
      );
      return;
    }
    // Log the standard output and error output
    console.log(stdout);
    console.error(stderr);
  });

  // Schedule the script to run again in 15 minutes
  setTimeout(runScript, 15 * 60 * 1000);
}

// Initial call to run the script
runScript();
