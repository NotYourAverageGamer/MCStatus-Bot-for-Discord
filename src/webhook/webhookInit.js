const { WebhookClient } = require('discord.js');

async function editMessageWithEmbeds(embed1, embed2) {
  const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
  await webhook.editMessage(process.env.MESSAGE_ID, {
    embeds: [embed1, embed2], // Array of new embeds to attach to the message
  });
}

module.exports = { editMessageWithEmbeds };
