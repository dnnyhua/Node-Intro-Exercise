const fs = require('fs');
const process = require('process');
const axios = require('axios');

let path;
let out;



// Example 
// $ node step3.js --out new.txt someFile.txt
// $ # no output, but new.txt contains contents of someFile.txt

// $ node step3.js --out new.txt  http://google.com
// $ # no output, but new.txt contains google's HTML

function handleOutput(text, out){
    if (out) {
        fs.writeFile(out, text, 'utf8', (err) => {
            if (err) {
                console.log(`Could not write to ${out}`);
                process.exit(1);
            }
        });
    }
    else {
        console.log(text);
    }

};


function cat(path, out){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error", err);
            process.exit(1)
        }
        else {
            handleOutput(data, out)
        }
    })

}


async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out)
    }
    catch (err){
        console.log(`Error retrieving ${url}: ${err}`)
        process.exit(1);
    }
}



// Example 
// $ node step3.js --out new.txt someFile.txt
// $ # no output, but new.txt contains contents of someFile.txt

// $ node step3.js --out new.txt  http://google.com
// $ # no output, but new.txt contains google's HTML


// if we indicate --out on the third index on the command line 
// set "out" and "path" accordingly so that we can write to that file
if (process.argv[2] === '--out') {

    // where the data will be written to; could be a new txt file or an existing file
    out = process.argv[3];

    // the file that is going to be written to "out"
    path = process.argv[4];
}
else {
    path = process.argv[2];
}

// checks to see if it is a website
if (path.slice(0,4) === 'http') {
    webCat(path, out);
} 
else {
    cat(path,out);
}



