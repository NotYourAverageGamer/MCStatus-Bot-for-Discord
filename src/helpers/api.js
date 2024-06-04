const axios = require('axios');

// Function to fetch server status from a given URL
async function fetchServerStatus(url) {
  try {
    // Make a GET request to the provided URL
    const response = await axios.get(url);
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the request
    console.error(`Error fetching server status from ${url}:`, error);
    // Return null if an error occurs
    return null;
  }
}

// Function to get the Java Edition server status
async function getJavaServerStatus() {
  const javaApiUrl = process.env.JAVA_API_URL; // Get the Java API URL from environment variables
  return fetchServerStatus(javaApiUrl); // Fetch and return the server status
}

// Function to get the Bedrock Edition server status
async function getBedrockServerStatus() {
  const bedrockApiUrl = process.env.BEDROCK_API_URL; // Get the Bedrock API URL from environment variables
  return fetchServerStatus(bedrockApiUrl); // Fetch and return the server status
}

// Export the functions for external use
module.exports = { getJavaServerStatus, getBedrockServerStatus };
