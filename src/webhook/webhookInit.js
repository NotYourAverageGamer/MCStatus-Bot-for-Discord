const { WebhookClient } = require('discord.js');

async function editMessageWithEmbeds(embed1, embed2, embed3) {
  const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
  await webhook.editMessage(process.env.MESSAGE_ID, {
    embeds: [embed1, embed2, embed3],
  });
}

module.exports = { editMessageWithEmbeds };
