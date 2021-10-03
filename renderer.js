var stopPython = function(){
  changeKill(true);
  console.log("Trying to Kill "+checkKill());
};

var nextInterval = function(){
  const spawn = require('child_process').spawn;
  var os = require('os');
  var locPath = getPath();
  var appLoc = appPath();
  // If this verision is packaged
  if (appLoc.search("app.asar")>=0){
    var appLoc = appLoc.slice(0,(appLoc.search("app.asar")-1));
  }
  // If macOS
  if(os.type()=="Darwin"){
    var exeLoc = appLoc+"/scripts/nextIntervalX";
  } else{
    var exeLoc = appLoc+"/scripts/nextIntervalX.exe";
  };
  var process = spawn(exeLoc,[document.getElementById("s1").value,document.getElementById("e1").value,locPath]);
  process.stdout.on('data', function (output) {
    var out = String(output);
    var mesg = out.slice(0,7);
    console.log(out);
    document.getElementById("data_dump").innerHTML=out;
    var delim = " , ";
    if(mesg!="Failed:"){
      var start = out.slice(17,out.search(delim));
      var end = out.slice((out.search(delim)+delim.length));
    document.getElementById("s1").value=start;
    document.getElementById("e1").value=end;
    }else{
      document.getElementById("data_dump").innerHTML=out;
    }
  });

};


var search = function (thisSearch,form){
  if(canRun()){
    changeRun(false);
    var formList = [[form.h1.value],[form.h2.value],[form.h3.value],[form.h4.value],[form.h5.value],[form.h6.value],[form.f1.value],[form.f2.value],[form.f3.value],[form.f4.value],[form.f5.value],[form.h6.value],[form.alternate.value],[form.s1.value],[form.e1.value],[document.getElementById("r1").value,document.getElementById("r2").value,document.getElementById("r3").value,document.getElementById("r4").value,document.getElementById("r5").value,document.getElementById("r6").value],[getPath()]];
    formJson = JSON.stringify(formList,null,"    ");
    var freeOut = ["Start"];
    var last = "";
    document.getElementById("data_dump").value=freeOut;
    const spawn = require('child_process').spawn;
    var appLoc = appPath();
    // If this verision is packaged
    if (appLoc.search("app.asar")>=0){
      var appLoc = appLoc.slice(0,(appLoc.search("app.asar")-1))
    }
    // If macOS
    if(appLoc[0,1]="/"){
      var exeLoc = appLoc+"/scripts/SearchItX";
    }
    // If Windows
    else{
      var exeLoc = appLoc+"/scripts/SearchItX.exe";
    }
    var process = spawn((exeLoc),[formJson]);
    process.stdout.on('data', function (output){
      var temp = String(output);
      console.log(temp);
      freeOut.push(temp);
      last = freeOut.slice(-1)[0];
      document.getElementById("data_dump").innerHTML=last;
      if(last.slice(0,4)=="http"){
      	require('electron').shell.openExternal(last);
      }
      if(checkKill()){
        process.kill('SIGINT');
        changeKill(false);
      }
    });
    process.on('exit', function() {
      changeRun(true);
    });
  }
  else{
    document.getElementById("data_dump").innerHTML="Wait for ASE to stop or click Quick Stop!";
  }
};




var alternate = function (thisButton,)
{
  var util = require("util");
  thisButton.classList.toggle("btn-primary");
  if (thisButton.value=="false"){
    thisButton.value="true";
  }
  if (thisButton.value=="true"){
    thisButton.value="false";
  }
  else {
    thisButton.value="true"
  }
}


function canRun(){
  var remote = require('@electron/remote');
  const mainGlobal = remote.getGlobal( 'global' );
  var run = mainGlobal.running;
  console.log(run);
  return run
}

function changeRun(run){
  const { ipcRenderer, remote } = require( "electron" );
  ipcRenderer.send('runmsg',run);
  document.getElementById("id1").disabled=!run;
  console.log(run);
  return run
}

function checkKill(){
  var remote = require('@electron/remote');
  const mainGlobal = remote.getGlobal( 'global' );
  var kill = mainGlobal.kill;
  console.log(kill);
  return kill
}

function changeKill(kill){
  const { ipcRenderer, remote } = require( "electron" );
  ipcRenderer.send('killmsg',kill);
  console.log(kill);
  return kill
}

function getPath(){
  var remote = require('@electron/remote');
  const mainGlobal = remote.getGlobal( 'global' );
  var fpath = mainGlobal.filePath;
  console.log(fpath);
  return fpath
}

function appPath(){
  var remote = require('@electron/remote');
  const mainGlobal = remote.getGlobal( 'global' )
  var fpath = mainGlobal.folderPath;
  console.log(fpath)
  return fpath // { n: 123 }
}

async function openFile(){
  const fs = require("fs");
  const {dialog} = require('@electron/remote');
  const file = await dialog.showOpenDialog({
    filters: [{ name: 'Text', extensions: ['txt'] }],
    properties: ['openFile']
  });
  if(file === undefined){
    document.getElementById("btn-searchfile").disabled=true;
    return;
  }else{
    var filePath = file.filePaths[0]
    var fileName = filePath.substring(filePath.lastIndexOf('/')+1);
    console.log(fileName);
    document.getElementById("btn-searchfile").disabled=false;
    document.getElementById("file-name").innerHTML=("Selected:  "+fileName);
    const { ipcRenderer, remote } = require( "electron" );
    ipcRenderer.send('filemsg',filePath)
  }
}

function redirect(){
  window.location.replace("./search.html");
}

function back(){
  window.location.assign("./update.html");
}
