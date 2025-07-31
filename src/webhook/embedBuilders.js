const { EmbedBuilder } = require('discord.js');

function createJavaEmbed(online, players, version, thumbnailUrl, dynmapUrl) {
  const embedColor = online ? 0x00ff00 : 0xff0000;
  const statusEmoji = online ? '🟢' : '🔴';

  const codeBlockServerStatus =
    '```ini\n' + statusEmoji + ' ' + (online ? 'Online' : 'Offline') + '```';

  const codeBlockPlayerCount =
    '```ini\n' +
    (players ? players.online : '0') +
    '/' +
    (players ? players.max : '0') +
    '```';

  const codeBlockMCVersion =
    '```ini\n' + (version ? version.name_raw : 'Offline') + '```';

  return new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(process.env.SERVER_NAME + ' | Java Edition')
    .setDescription('_ _') // placeholder
    .setThumbnail(thumbnailUrl)
    .setURL(dynmapUrl)
    .addFields(
      { name: '> STATUS', value: codeBlockServerStatus, inline: true },
      { name: '> PLAYERS', value: codeBlockPlayerCount, inline: true },
      { name: '> VERSION', value: codeBlockMCVersion, inline: true },
      { name: '> RESTARTS', value: '```Daily @ 12PM / Midday```' }
    )
    .setTimestamp()
    .setFooter({ text: 'Last Updated' });
}

function createBedrockEmbed(online, players, version, thumbnailUrl) {
  const embedColor = online ? 0x00ff00 : 0xff0000;
  const statusEmoji = online ? '🟢' : '🔴';

  const codeBlockServerStatus =
    '```ini\n' + statusEmoji + ' ' + (online ? 'Online' : 'Offline') + '```';

  const codeBlockPlayerCount =
    '```ini\n' +
    (players ? players.online : '0') +
    '/' +
    (players ? players.max : '0') +
    '```';

  const codeBlockMCVersion =
    '```ini\n' + (version ? version.name : 'Offline') + '```';

  return new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(process.env.SERVER_NAME + ' | Bedrock Edition')
    .setDescription('_ _') // placeholder
    .setThumbnail(thumbnailUrl)
    .addFields(
      { name: '> STATUS', value: codeBlockServerStatus, inline: true },
      { name: '> PLAYERS', value: codeBlockPlayerCount, inline: true },
      { name: '> VERSION', value: codeBlockMCVersion, inline: true }
    )
    .setTimestamp()
    .setFooter({ text: 'Last Updated' });
}

function createCobblemonEmbed(online, players, version, thumbnailUrl, dynmapUrl) {
  const embedColor = online ? 0x00ff00 : 0xff0000;
  const statusEmoji = online ? '🟢' : '🔴';

  const codeBlockServerStatus =
    '```ini\n' + statusEmoji + ' ' + (online ? 'Online' : 'Offline') + '```';

  const codeBlockPlayerCount =
    '```ini\n' +
    (players ? players.online : '0') +
    '/' +
    (players ? players.max : '0') +
    '```';

  const codeBlockMCVersion =
    '```ini\n' + (version ? version.name_raw : 'Offline') + '```';

  return new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(process.env.SERVER_NAME + ' | Cobblemon on Fabric (Java)')
    .setDescription('_ _') // placeholder
    .setThumbnail(thumbnailUrl)
    .setURL(dynmapUrl)
    .addFields(
      { name: '> STATUS', value: codeBlockServerStatus, inline: true },
      { name: '> PLAYERS', value: codeBlockPlayerCount, inline: true },
      { name: '> VERSION', value: codeBlockMCVersion, inline: true }
    )
    .setTimestamp()
    .setFooter({ text: 'Last Updated' });
}

module.exports = { createJavaEmbed, createBedrockEmbed, createCobblemonEmbed };
