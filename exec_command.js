const {exec} = require('child_process');

exec('ls -l', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
})
