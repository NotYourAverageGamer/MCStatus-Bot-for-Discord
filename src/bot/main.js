const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });

const axios = require('axios');
const { getCurrentDateTime } = require('../helpers/dateTime');
const { editMessageWithEmbeds } = require('../webhook/webhookInit');
const {
  createJavaEmbed,
  createBedrockEmbed,
  createCobblemonEmbed,
} = require('../webhook/embedBuilders');

const JAVA_API_URL = process.env.JAVA_API_URL;
const BEDROCK_API_URL = process.env.BEDROCK_API_URL;
const COBBLEMON_API_URL = process.env.COBBLEMON_API_URL;
const THUMBNAIL_URL = process.env.THUMBNAIL_URL;
const JAVA_DYNMAP_URL = process.env.JAVA_DYNMAP_URL;
const COBBLEMON_DYNMAP_URL = process.env.COBBLEMON_DYNMAP_URL;

async function fetchServerStatus(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching server status from ${apiUrl}: ${error}`);
  }
}

async function createServerStatusEmbeds() {
  try {
    const javaData = await fetchServerStatus(JAVA_API_URL);
    const javaEmbed = createJavaEmbed(
      javaData.online,
      javaData.players,
      javaData.version,
      THUMBNAIL_URL,
      JAVA_DYNMAP_URL
    );

    const bedrockData = await fetchServerStatus(BEDROCK_API_URL);
    const bedrockEmbed = createBedrockEmbed(
      bedrockData.online,
      bedrockData.players,
      bedrockData.version,
      THUMBNAIL_URL
    );

    const cobblemonData = await fetchServerStatus(COBBLEMON_API_URL);
    const cobblemonEmbed = createCobblemonEmbed(
      cobblemonData.online,
      cobblemonData.players,
      cobblemonData.version,
      THUMBNAIL_URL,
      COBBLEMON_DYNMAP_URL
    );

    return [javaEmbed, bedrockEmbed, cobblemonEmbed];
  } catch (error) {
    throw new Error(`Error creating server status embeds: ${error}`);
  }
}

async function updateDiscordEmbeds() {
  try {
    const [javaEmbed, bedrockEmbed, cobblemonEmbed] = await createServerStatusEmbeds();
    editMessageWithEmbeds(javaEmbed, bedrockEmbed, cobblemonEmbed);

    process.stdout.write(
      getCurrentDateTime() + ': \x1b[32mEmbeds updated successfully.\x1b[0m'
    );
  } catch (error) {
    process.stderr.write(
      getCurrentDateTime() + ': \x1b[31mError updating embeds:\x1b[0m\n'
    );
    process.stderr.write(`${error}\n`);
  }
}

updateDiscordEmbeds();
