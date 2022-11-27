const newman = require('newman');

class NewmanConfig {

    static ALLURE_REPORT_PATH = './reports/allure';
    static NEWMAN_JSON_REPORT_PATH = './reports/json/';
    static HTML_NEWMAN_REPORT_PATH = './reports/html/';
    static REPORT_OPTIONS = ['cli', 'json', 'html', 'allure'];


    constructor(arg_feed_file_path) {
        this.feed_json_file = arg_feed_file_path;
        this.execute();
    }

    execute() {
        let feed_file = require(this.feed_json_file);
        let run_list = feed_file.runs;
        run_list.forEach((value, index) => {
            console.log("\x1b[34m====== COLLECTION " + index + " ======\x1b[0m");
            console.log(value);
            console.log("\n");
            if (value.environment == undefined) {
                NewmanConfig.runCollection(value.collection);
            } else {
                NewmanConfig.runCollectionWithEnv(value.collection, value.environment);
            }
        });
    }

    static runCollectionWithEnv(collection, environment) {
        // call newman.run to pass `options` object and wait for callback
        let file_name = collection.split("/");
        newman.run({
            collection: require(collection),
            environment: require(environment),
            reporters: NewmanConfig.REPORT_OPTIONS,
            reporter: {
                html: {
                    // If not specified, the file will be written to `newman/` in the current working directory
                    export: NewmanConfig.HTML_NEWMAN_REPORT_PATH.concat(file_name[file_name.length - 1]).concat('.html')
                },
                allure: {
                    export: NewmanConfig.ALLURE_REPORT_PATH
                },
                json: {
                    export: NewmanConfig.NEWMAN_JSON_REPORT_PATH.concat(file_name[file_name.length - 1]).concat('.json')
                }
            }
        }, function (err) {
            if (err) { throw err; }
            console.log(`==> ${collection} is \x1b[34mfinished\x1b[0m`);
        });
    }

    static runCollection(collection) {
        // call newman.run to pass `options` object and wait for callback
        var file_name = collection.split("/")
        newman.run({
            collection: require(collection),
            reporters: NewmanConfig.REPORT_OPTIONS,
            reporter: {
                html: {
                    // If not specified, the file will be written to `newman/` in the current working directory
                    export: NewmanConfig.HTML_NEWMAN_REPORT_PATH.concat(file_name[file_name.length - 1]).concat('.html')
                },
                allure: {
                    export: NewmanConfig.ALLURE_REPORT_PATH
                },
                json: {
                    export: NewmanConfig.NEWMAN_JSON_REPORT_PATH.concat(file_name[file_name.length - 1]).concat('.json')
                }
            }
        }, function (err) {
            if (err) { throw err; }
            console.log(`==> ${collection} is \x1b[34mfinished\x1b[0m`);
        });

    }

}

module.exports = NewmanConfig