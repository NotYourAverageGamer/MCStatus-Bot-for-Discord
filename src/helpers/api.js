const axios = require('axios');

async function fetchServerStatus(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching server status from ${url}:`, error);
    return null;
  }
}

async function getJavaServerStatus() {
  const javaApiUrl = process.env.JAVA_API_URL;
  return fetchServerStatus(javaApiUrl);
}

async function getBedrockServerStatus() {
  const bedrockApiUrl = process.env.BEDROCK_API_URL;
  return fetchServerStatus(bedrockApiUrl);
}

async function getCobblemonServerStatus() {
  const cobblemonApiUrl = process.env.COBBLEMON_API_URL;
  return fetchServerStatus(cobblemonApiUrl);
}

module.exports = { getJavaServerStatus, getBedrockServerStatus, getCobblemonServerStatus };
