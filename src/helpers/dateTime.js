// Function to get the current date and time. Locale and time/date stamp style can be modified as needed
function getCurrentDateTime() {
  const now = new Date(); // Get the current date and time
  const dateStamp = now.toLocaleDateString('en-AU'); // Format the date in 'en-AU' locale
  const timeStamp = now.toLocaleTimeString('en-AU'); // Format the time in 'en-AU' locale
  return `${dateStamp} @ ${timeStamp}`; // Combine date and time into a single string
}

// Export the function for external use
module.exports = { getCurrentDateTime };
