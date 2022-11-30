const newman = require('newman');

class NewmanConfig {

    static ALLURE_REPORT_PATH = './reports/allure';
    static NEWMAN_JSON_REPORT_PATH = './reports/json/';
    static HTML_NEWMAN_REPORT_PATH = './reports/html/';
    static REPORT_OPTIONS = ['cli', 'json', 'html', 'allure'];

    constructor(arg_feed_file_path) {

        // Read collections
        let run_list = require(arg_feed_file_path).collections;

        run_list.forEach((item, index) => {
            console.log("\x1b[34mCollection " + index + ":\x1b[0m");
            console.log(item);
            NewmanConfig.runCollection(item.collection, item.environment);
        });
    }

    static runCollection(collection, environment) {
        let file_name = collection.split("/");

        let options = {
            collection: require(collection),
            reporters: NewmanConfig.REPORT_OPTIONS,
            reporter: {
                allure: {
                    export: NewmanConfig.ALLURE_REPORT_PATH
                },
                html: {
                    export: NewmanConfig.HTML_NEWMAN_REPORT_PATH.concat(file_name[file_name.length - 1]).concat('.html')
                },
                json: {
                    export: NewmanConfig.NEWMAN_JSON_REPORT_PATH.concat(file_name[file_name.length - 1]).concat('.json')
                }
            }
        };

        // If environment is specified
        if (!environment == undefined) {
            options.environment = require(environment);
        }

        newman.run(options, function (err) {
            if (err) { throw err; }
            console.log(`\x1b[34m==> ${collection} is finished \u235f\x1b[0m`);
        });
    }
}

module.exports = NewmanConfig