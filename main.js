const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');







//setTimeout(loopPos, 2000);


let win
function createWindow() {

    win = new BrowserWindow({
        webPreferences: {
            webSecurity: false
        }
    })
    app.commandLine.appendSwitch('ignore-certificate-errors');
    win.loadURL(url.format({
        pathname: path.join(__dirname, './Ceiba html/variablesArduino.html'),
        protocol: 'file',
        webPreferences: {
            devTools: true
        }
    }))
    win.maximize();
    win.setFullScreen(true);
    win.once('ready-to-show', () => win.show)
    //peticion para actualizar variables del arduino
    //if(config.env != 'test')
    //autoUpdater.checkForUpdates();
}





app.on('ready', createWindow)



