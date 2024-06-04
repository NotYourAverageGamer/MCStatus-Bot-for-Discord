const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const axios = require('axios');
const { getCurrentDateTime } = require('../helpers/dateTime.js');
const { editMessageWithEmbeds } = require('../webhook/webhookInit.js');
const {
  createJavaEmbed,
  createBedrockEmbed,
} = require('../webhook/embedBuilders.js');

// Function to fetch server status from APIs and update Discord embeds
async function getServerStatus() {
  try {
    // Get API URLs from environment variables
    const apiUrl1 = process.env.JAVA_API_URL;
    const apiUrl2 = process.env.BEDROCK_API_URL;

    // Fetch server status data from the Java API URL
    const response1 = await axios.get(apiUrl1);
    const { online, players, version } = response1.data;

    // Process player count for Java server
    const playerCount = players ? players.online : '0';
    const maxPlayers = players ? players.max : '0';

    // Process Minecraft version for Java server
    const mcVersion = version ? version.name_raw : 'Offline';

    // Create embed for Java server status
    const embed1 = createJavaEmbed(
      online,
      players,
      version,
      process.env.THUMBNAIL_URL,
      process.env.DYNMAP_URL
    );

    // Fetch server status data from the Bedrock API URL
    const response2 = await axios.get(apiUrl2);
    const {
      online: online2,
      players: players2,
      version: version2,
    } = response2.data;

    // Process player count for Bedrock server
    const playerCount2 = players2 ? players2.online : '0';
    const maxPlayers2 = players2 ? players2.max : '0';

    // Process Minecraft version for Bedrock server
    const mcVersion2 = version2 ? version2.name : 'Offline';

    // Create embed for Bedrock server status
    const embed2 = createBedrockEmbed(
      online2,
      players2,
      version2,
      process.env.THUMBNAIL_URL
    );

    // Edit Discord message with the new embeds
    editMessageWithEmbeds(embed1, embed2);

    // Log successful embed update to console (in green) with timestamp
    console.log(
      getCurrentDateTime() + ': \x1b[32mEmbeds updated successfully.\x1b[0m'
    );
  } catch (error) {
    // Log error to console (in red) with timestamp
    console.error(
      getCurrentDateTime() + ': \x1b[31mError updating embeds:\x1b[0m',
      error
    );
  }
}

// Call function to fetch server status and update Discord embeds
getServerStatus();
