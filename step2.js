const fs = require('fs');
const process = require('process');
const axios = require('axios');



function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error", err);
            process.kill(1)
        }
        console.log(data)
    })

}


async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data)
    }
    catch (err){
        console.log(`Error retrieving ${url}: ${err}`)
        process.exit(1);
    }
}

// process.argv[2] will take index 2 on the commandline which is the website
// node step2.js https://github.com/

let path = process.argv[2];


if (path.slice(0,4) === 'http') {
    webCat(path);
} 
else {
    cat(path);
}