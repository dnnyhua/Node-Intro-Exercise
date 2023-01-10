const fs = require('fs');
const process = require('process')


function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error", err);
            process.kill(1)
        }
        console.log(data)
    })

}


cat('someFile.txt')