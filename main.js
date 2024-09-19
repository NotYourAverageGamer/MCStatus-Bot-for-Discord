const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const AnsiToHtml = require('ansi-to-html');
const convert = new AnsiToHtml();
const { checkInternetConnection } = require('./src/helpers/checkInternet');

const isMac = process.platform === 'darwin';

let mainWindow;
let botInterval;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 510,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('./src/gui/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    width: 420,
    height: 210,
  });

  aboutWindow.loadFile('./src/gui/about.html');

  aboutWindow.setMenu(null);
}

// Menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
            {
              label: 'Quit',
              click: () => app.quit(),
              accelerator: 'CmdOrCtrl+W',
            },
          ],
        },
      ]
    : []),
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

app.on('ready', () => {
  createWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

async function startBot(event) {
  try {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      console.error('No internet connection, cannot start bot');
      event.sender.send(
        'bot-output',
        'No internet connection, cannot start bot'
      );
      return;
    }
    const botProcess = spawn('node', ['src/bot/main.js']);
    botProcess.stdout.on('data', (data) => {
      const html = convert.toHtml(data.toString());
      event.sender.send('bot-output', html);
    });
    botProcess.stderr.on('data', (data) => {
      const html = convert.toHtml(data.toString());
      event.sender.send('bot-output', html);
    });
    botProcess.on('close', (code) => {
      if (code !== 0) {
        const html = convert.toHtml(`Bot process exited with code ${code}`);
        event.sender.send('bot-output', html);
      }
      clearInterval(botInterval); // Add this line to clear the interval
      botInterval = null;
    });
  } catch (error) {
    console.error('Error starting bot:', error);
    event.sender.send('bot-output', 'Error starting bot: ' + error.message);
  }
}

ipcMain.on('start-bot', (event) => {
  startBot(event);
  botInterval = setInterval(() => {
    startBot(event);
  }, 15 * 60 * 1000); // 15 minutes
  event.sender.send('bot-output', 'Bot started and scheduled every 15 minutes');
});

ipcMain.on('stop-bot', (event) => {
  if (botInterval !== null) {
    clearInterval(botInterval);
    botInterval = null;
  }
  event.sender.send('bot-output', 'Bot process stopped by user');
});
