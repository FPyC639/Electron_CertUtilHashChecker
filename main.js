const { app, BrowserWindow, ipcMain, dialog } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // It's safer to use contextIsolation: true with a preload script
        }
    });
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply('selected-file-path', result.filePaths[0]);
        } else {
            event.reply('selected-file-path', 'No file selected');
        }
    }).catch(err => {
        event.reply('selected-file-path', `Error: ${err.message}`);
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
