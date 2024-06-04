const { EmbedBuilder } = require('discord.js');

// Function to create an embed for Java Edition Minecraft server status
function createJavaEmbed(online, players, version, thumbnailUrl, dynmapUrl) {
  // Set embed color based on server status
  const embedColor = online ? 0x00ff00 : 0xff0000;
  // Set status emoji based on server status
  const statusEmoji = online ? '🟢' : '🔴';
  // Format server status as a code block with ini syntax highlighting
  const codeBlockServerStatus =
    '```ini\n' + statusEmoji + ' ' + (online ? 'Online' : 'Offline') + '```';
  // Format player count as a code block with ini syntax highlighting
  const codeBlockPlayerCount =
    '```ini\n' +
    (players ? players.online : '0') +
    '/' +
    (players ? players.max : '0') +
    '```';
  // Format Minecraft version as a code block with ini syntax highlighting
  const codeBlockMCVersion =
    '```ini\n' + (version ? version.name_raw : 'Offline') + '```';

  // Create and return the embed
  return new EmbedBuilder()
    .setColor(embedColor) // Set the color of the embed
    .setTitle(process.env.SERVER_NAME + ' | Java Edition') // Set the title of the embed
    .setDescription('_ _') // Set the description of the embed (placeholder)
    .setThumbnail(thumbnailUrl) // Set the thumbnail image of the embed
    .setURL(dynmapUrl) // Set the URL of the embed
    .addFields(
      // Add fields to the embed
      { name: '> STATUS', value: codeBlockServerStatus, inline: true },
      { name: '> PLAYERS', value: codeBlockPlayerCount, inline: true },
      { name: '> VERSION', value: codeBlockMCVersion, inline: true },
      { name: '> RESTARTS', value: '```Daily @ Midnight```' }
    )
    .setTimestamp() // Set the timestamp of the embed
    .setFooter({ text: 'Last Updated' }); // Set the footer of the embed
}

// Function to create an embed for Bedrock Edition Minecraft server status
function createBedrockEmbed(online, players, version, thumbnailUrl) {
  // Set embed color based on server status
  const embedColor = online ? 0x00ff00 : 0xff0000;
  // Set status emoji based on server status
  const statusEmoji = online ? '🟢' : '🔴';
  // Format server status as a code block with ini syntax highlighting
  const codeBlockServerStatus =
    '```ini\n' + statusEmoji + ' ' + (online ? 'Online' : 'Offline') + '```';
  // Format player count as a code block with ini syntax highlighting
  const codeBlockPlayerCount =
    '```ini\n' +
    (players ? players.online : '0') +
    '/' +
    (players ? players.max : '0') +
    '```';
  // Format Minecraft version as a code block with ini syntax highlighting
  const codeBlockMCVersion =
    '```ini\n' + (version ? version.name : 'Offline') + '```';

  // Create and return the embed
  return new EmbedBuilder()
    .setColor(embedColor) // Set the color of the embed
    .setTitle(process.env.SERVER_NAME + ' | Bedrock Edition') // Set the title of the embed
    .setDescription('_ _') // Set the description of the embed (placeholder)
    .setThumbnail(thumbnailUrl) // Set the thumbnail image of the embed
    .addFields(
      // Add fields to the embed
      { name: '> STATUS', value: codeBlockServerStatus, inline: true },
      { name: '> PLAYERS', value: codeBlockPlayerCount, inline: true },
      { name: '> VERSION', value: codeBlockMCVersion, inline: true }
    )
    .setTimestamp() // Set the timestamp of the embed
    .setFooter({ text: 'Last Updated' }); // Set the footer of the embed
}

// Export the functions for external use
module.exports = { createJavaEmbed, createBedrockEmbed };
