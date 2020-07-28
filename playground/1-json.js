const fs = require("fs");

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = JSON.parse(dataBuffer.toString());

dataJSON.name = 'Robin';
dataJSON.age = 28

const newDataJSON = JSON.stringify(dataJSON);

fs.writeFileSync('1-json.json', newDataJSON);

const newDataBuffer = fs.readFileSync('1-json.json');

