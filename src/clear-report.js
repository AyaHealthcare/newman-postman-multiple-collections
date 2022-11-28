const fs = require('fs');
const path = require('path');

const reportDirectories = [
    "./reports/allure/",
    "./reports/html/",
    "./reports/json/"
];

function removeReportDirectories(directories) {
    for (let directory of directories) {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            // Exclude files end with .keep
            for (let file of files) {
                if (file != '.keep') {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;
                    });
                }
            }
            console.log(`\x1b[32m${directory} is removed \u2713\x1b[0m`);
        });
    }
}

removeReportDirectories(reportDirectories);