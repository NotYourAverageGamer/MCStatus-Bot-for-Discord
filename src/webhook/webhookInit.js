const { WebhookClient } = require('discord.js');

// Function to edit a message with new embeds
async function editMessageWithEmbeds(embed1, embed2) {
  // Initialize webhook client using the webhook URL from environment variables
  const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
  // Edit the message with the specified ID, replacing its embeds with the new ones
  await webhook.editMessage(process.env.MESSAGE_ID, {
    embeds: [embed1, embed2], // Array of new embeds to attach to the message
  });
}

// Export the function for external use
module.exports = { editMessageWithEmbeds };
