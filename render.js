const { ipcRenderer } = require('electron');

document.getElementById("P1").addEventListener("click", selectFile);
document.getElementById("P2").addEventListener("click", runPowershellScript);

function selectFile() {
    ipcRenderer.send('open-file-dialog');
}

ipcRenderer.on('selected-file-path', (event, path) => {
    console.log('Selected file path:', path);
    document.getElementById('param1').value = path;
});

function runPowershellScript() {
    let scriptPath = ".\\main.ps1"; // Ensure the path is correctly escaped
    let param1 = document.getElementById('param1').value; // Contains the file path
    let param2 = document.getElementById('param2').value;
    let command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}" -fh "${param1}" -algorithm "${param2}"`;

    require('child_process').exec(command, (error, stdout, stderr) => {
        if (error) {
            document.getElementById('output').textContent = `Error: ${error.message}`;
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            document.getElementById('output').textContent = `stderr: ${stderr}`;
            console.error(`stderr: ${stderr}`);
            return;
        }
        document.getElementById('output').textContent = stdout;
        console.log(`stdout: ${stdout}`);
    });
}

// These should be outside the runPowershellScript function
window.selectFile = selectFile;
window.runPowershellScript = runPowershellScript;
