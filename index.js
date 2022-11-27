const newmanConfig = require('./src/main.js');

// Validate input arguments
if (process.argv.length <= 2) {
    console.log("\x1b[31m==== PLEASE PROVIDE PATH TO FEED FILE ====\nEx: '../feeds/sample_feed.json'\x1b[0m")
} else {
    var args = process.argv.slice(2);
    new newmanConfig(args[0]);
}