// Load environment variables from .env
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

// Import required modules
const axios = require('axios');
const { getCurrentDateTime } = require('../helpers/dateTime');
const { editMessageWithEmbeds } = require('../webhook/webhookInit');
const {
  createJavaEmbed,
  createBedrockEmbed,
} = require('../webhook/embedBuilders');

// Define constants for API URLs
const JAVA_API_URL = process.env.JAVA_API_URL;
const BEDROCK_API_URL = process.env.BEDROCK_API_URL;
const THUMBNAIL_URL = process.env.THUMBNAIL_URL;
const DYNMAP_URL = process.env.DYNMAP_URL;

// Define a function to fetch server status data from an API
async function fetchServerStatus(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching server status from ${apiUrl}: ${error}`);
  }
}

// Define a function to create embeds for server status
async function createServerStatusEmbeds() {
  try {
    // Fetch server status data from Java API
    const javaData = await fetchServerStatus(JAVA_API_URL);
    const javaEmbed = createJavaEmbed(
      javaData.online,
      javaData.players,
      javaData.version,
      THUMBNAIL_URL,
      DYNMAP_URL
    );

    // Fetch server status data from Bedrock API
    const bedrockData = await fetchServerStatus(BEDROCK_API_URL);
    const bedrockEmbed = createBedrockEmbed(
      bedrockData.online,
      bedrockData.players,
      bedrockData.version,
      THUMBNAIL_URL
    );

    return [javaEmbed, bedrockEmbed];
  } catch (error) {
    throw new Error(`Error creating server status embeds: ${error}`);
  }
}

// Define the main function to update Discord embeds
async function updateDiscordEmbeds() {
  try {
    const [javaEmbed, bedrockEmbed] = await createServerStatusEmbeds();
    editMessageWithEmbeds(javaEmbed, bedrockEmbed);

    // Log successful embed update to console (in green) with timestamp
    process.stdout.write(
      getCurrentDateTime() + ': \x1b[32mEmbeds updated successfully.\x1b[0m'
    );
  } catch (error) {
    // Log error to console (in red) with timestamp
    process.stderr.write(
      getCurrentDateTime() + ': \x1b[31mError updating embeds:\x1b[0m\n'
    );
    process.stderr.write(`${error}\n`);
  }
}

// Call the main function to update Discord embeds
updateDiscordEmbeds();
