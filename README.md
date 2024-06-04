# MCStatus Bot for Discord

MCStatus Bot for Discord is a bot designed to fetch the status of Minecraft servers and display that information in a Discord server. It periodically checks the status of Minecraft servers (Java Edition and Bedrock Edition) using user-provided API URLs from [mcstatus.io](https://mcstatus.io) and updates the server status on Discord using webhooks and embeds.

## Features

- Fetches and displays the status of Minecraft servers on Discord for both Java and Bedrock Editions.
- Updates server status periodically using webhooks and embeds.
- Supports displaying `Server Status`, `Player Count`, `Server Version`, and `Restart Schedule`.

## Prerequisites

Before using the **MCStatus Bot for Discord**, make sure you have the following:

- `Node.js` installed. ([Installing Node.js](https://discordjs.guide/preparations/#installing-node-js))
- A Discord server where you have permissions to add bots and manage webhooks.
- **API URLs** for the Minecraft servers you want to monitor.
  - **Java URL** example: `https://api.mcstatus.io/v2/status/java/YOUR.SERVER.IP`
  - **Bedrock URL** example: `https://api.mcstatus.io/v2/status/bedrock/YOUR.SERVER.IP`
- A Discord webhook URL to send updates to your Discord server. (You can obtain one from [Discohook](https://discohook.org/). Formatting is handled in `main.js`)
- A `.env` file with necessary environment variables set (copy/rename `example.env` for quick-setup).

## Installation

1. Download and unzip [this repository](https://github.com/NotYourAverageGamer/MCStatus-Bot-for-Discord/archive/refs/heads/main.zip) **OR** Clone it with:

   ```bash
   git clone https://github.com/NotYourAverageGamer/MCStatus-Bot-for-Discord.git
   ```

2. Navigate to the directory:

   ```bash
   cd YOUR_PATH_TO/MCStatus-Bot-for-Discord
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy/Rename `example.env` to `.env` and fill in the following environment variables:
   - `SERVER_NAME`: Your server name, to be displayed as the title in the webhook.
   - `JAVA_API_URL`: API URL for the Java Edition Minecraft server.
   - `BEDROCK_API_URL`: API URL for the Bedrock Edition Minecraft server.
   - `WEBHOOK_URL`: Discord webhook URL for posting updates.
   - `MESSAGE_ID`: ID of the message to edit with new embeds.
   - `DYNMAP_URL`: Enter Dynmap URL (if applicable).
   - `THUMBNAIL_URL`: Enter URL to server thumbnail.

## Usage

To start the bot, run the following command from inside the `MCStatus-Bot-for-Discord` directory:

```bash
npm start
```

This will initiate the bot, and it will periodically fetch and update the status of the Minecraft servers on your Discord server. _(Set to 15 minutes by Default)_

## Webhook/Embed Example Images _(Icon not included)_

#### Desktop

![desktop](https://raw.githubusercontent.com/NotYourAverageGamer/MCStatus-Bot-for-Discord/main/screenshots/desktop.png)

#### iOS

![ios](https://raw.githubusercontent.com/NotYourAverageGamer/MCStatus-Bot-for-Discord/main/screenshots/ios.png)

#### Android

![android](https://raw.githubusercontent.com/NotYourAverageGamer/MCStatus-Bot-for-Discord/main/screenshots/android.png)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
