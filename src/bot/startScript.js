const { exec } = require('child_process');
const { getCurrentDateTime } = require('../helpers/dateTime');
const { handleInternetCheckAndRetry } = require('../helpers/retryLogic');

let isFirstExecution = true;

function clearConsole() {
  console.clear();
}

async function runScript() {
  if (isFirstExecution) {
    clearConsole();
    isFirstExecution = false;
  }

  const isInternetConnected = await handleInternetCheckAndRetry(runScript);
  if (!isInternetConnected) return;

  exec('node src/bot/main.js', (error, stdout, stderr) => {
    if (error) {
      console.error(
        `${getCurrentDateTime()}: \x1b[31mError executing main.js:\x1b[0m`,
        error
      );
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });

  setTimeout(runScript, 15 * 60 * 1000);
}

runScript();
