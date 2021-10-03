// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog, Menu} = require('electron');
require('@electron/remote/main').initialize();

var path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

global.folderPath = "NULL";

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    //titleBarStyle: 'hidden',
    width: 900,
    height: 630,
    minWidth: 600,
    minHeight: 615,
    //show: false,
    icon: path.join(__dirname, './assets/icons/png/icon.png'),
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }

  });
  require("@electron/remote/main").enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadFile('./index.html');
  require('./menu/mainmenu');
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

global.folderPath = app.getAppPath();

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

const { ipcMain } = require( "electron" );

global.running=true;
global.kill=false;
global.filePath="NULL";

ipcMain.on( "filemsg", (event, filesmsg ) => {
  updateFile(filesmsg);
  console.log(filesmsg);
} );
function updateFile(fileP){
  global.filePath=fileP;
  console.log(global.filePath);
}

ipcMain.on( "runmsg", (event, runsmsg) => {
  updateRun(runsmsg);
  console.log(runsmsg);
} );
function updateRun(run){
  global.running=run;
  console.log(global.running);
}

ipcMain.on( "killmsg", (event, killsmsg) => {
  updateKill(killsmsg);
  console.log(killsmsg);
} );
function updateKill(chKill){
  global.kill=chKill;
  console.log(global.kill);
}
