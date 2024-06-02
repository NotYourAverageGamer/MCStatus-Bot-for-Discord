// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const axios = require('axios');
const { WebhookClient, EmbedBuilder } = require('discord.js');

// Function to get the current date and time in Australia/Sydney timezone
function getCurrentDateTime() {
  const options = { timeZone: 'Australia/Sydney' };
  const now = new Date();
  const dateStamp = now.toLocaleDateString('en-AU', options);
  const timeStamp = now.toLocaleTimeString('en-AU', options);
  return `${dateStamp} @ ${timeStamp}`;
}

// Function to fetch server status from APIs and update Discord embeds
async function getServerStatus() {
  try {
    // Get API URLs from environment variables
    const apiUrl1 = process.env.API_URL_JAVA;
    const apiUrl2 = process.env.API_URL_BEDROCK;

    // Fetch server status data from API 1
    const response1 = await axios.get(apiUrl1);
    const { online, players, version } = response1.data;
    const serverStatus = online ? 'Online' : 'Offline';

    // Process server status data from API 1
    let playerCount, maxPlayers;
    if (players) {
      playerCount = players.online;
      maxPlayers = players.max;
    } else {
      playerCount = '0';
      maxPlayers = '0';
    }

    let mcVersion;
    if (version) {
      mcVersion = version.name_raw;
    } else {
      mcVersion = 'Offline';
    }

    const statusEmoji = online ? '🟢' : '🔴';
    const embedColor = online ? 0x00ff00 : 0xff0000;
    const codeBlockServerStatus =
      '```ini\n' + statusEmoji + ' ' + serverStatus + '```';
    const codeBlockPlayerCount =
      '```ini\n' + playerCount + '/' + maxPlayers + '```';
    const codeBlockMCVersion = '```ini\n' + mcVersion + '```';

    // Create EmbedBuilder object for Java Edition server status
    const embed1 = new EmbedBuilder()
      // Set embed color based on server status
      .setColor(embedColor)
      .setTitle('HomieCraft | Java Edition')
      .setDescription('_ _')
      .setThumbnail(process.env.THUMBNAIL_URL)
      .setURL(process.env.DYNMAP_URL)
      // Add fields with server status information
      .addFields(
        { name: '> STATUS', value: codeBlockServerStatus, inline: true },
        { name: '> PLAYERS', value: codeBlockPlayerCount, inline: true },
        { name: '> VERSION', value: codeBlockMCVersion, inline: true },
        { name: '> RESTARTS', value: '```Daily @ Midnight```' }
      )
      .setTimestamp()
      .setFooter({ text: 'Last Updated' });

    // Fetch server status data from API 2
    const response2 = await axios.get(apiUrl2);
    const {
      online: online2,
      players: players2,
      version: version2,
    } = response2.data;

    // Process server status data from API 2
    let playerCount2, maxPlayers2;
    if (players2) {
      playerCount2 = players2.online;
      maxPlayers2 = players2.max;
    } else {
      playerCount2 = '0';
      maxPlayers2 = '0';
    }

    let mcVersion2;
    if (version2) {
      mcVersion2 = version2.name;
    } else {
      mcVersion2 = 'Offline';
    }

    const statusEmoji2 = online2 ? '🟢' : '🔴';
    const embedColor2 = online ? 0x00ff00 : 0xff0000;
    const codeBlockServerStatus2 =
      '```ini\n' +
      statusEmoji2 +
      ' ' +
      (online2 ? 'Online' : 'Offline') +
      '```';
    const codeBlockPlayerCount2 =
      '```ini\n' + playerCount2 + '/' + maxPlayers2 + '```';
    const codeBlockMCVersion2 = '```ini\n' + mcVersion2 + '```';

    // Create EmbedBuilder object for Bedrock Edition server status
    const embed2 = new EmbedBuilder()
      // Set embed color based on server status
      .setColor(embedColor2)
      .setTitle('HomieCraft | Bedrock Edition')
      .setDescription('_ _')
      .setThumbnail(process.env.THUMBNAIL_URL)
      // Add fields with server status information
      .addFields(
        { name: '> STATUS', value: codeBlockServerStatus2, inline: true },
        { name: '> PLAYERS', value: codeBlockPlayerCount2, inline: true },
        { name: '> VERSION', value: codeBlockMCVersion2, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Last Updated' });

    // Initialize webhook client
    const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
    // Edit message with new embeds
    await webhook.editMessage(process.env.MESSAGE_ID, {
      embeds: [embed1, embed2],
    });

    // Log successful embed update (in green) with timestamp
    console.log(
      getCurrentDateTime() + ': \x1b[32mEmbeds updated successfully.\x1b[0m'
    );
  } catch (error) {
    // Log error (in red) with timestamp
    console.error(
      getCurrentDateTime() + ': \x1b[31mError updating embeds:\x1b[0m',
      error
    );
  }
}

// Call function to fetch server status and update Discord embeds
getServerStatus();
