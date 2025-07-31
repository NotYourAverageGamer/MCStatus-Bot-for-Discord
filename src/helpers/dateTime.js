// Function to get the current date and time
// Locale and time/date stamp style can be modified as needed
function getCurrentDateTime() {
  const now = new Date();
  const dateStamp = now.toLocaleDateString('en-AU');
  const timeStamp = now.toLocaleTimeString('en-AU');
  return `${dateStamp} @ ${timeStamp}`; // Combine date and time into a single string
}

module.exports = { getCurrentDateTime };
