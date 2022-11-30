<h1 align="center">
  <br>
  <a><img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/ATWT_background.PNG"></a>
  <a><img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/badge.png" alt="badge" width="800px"></a>
</h1>

<h3 align="center" style="bold">A small framework to execute multiple postman collections in single run by leveraging newman library. Intergrated with HTML, JSON and Allure reports.</h3>

## Table of Contents

- [Changelogs](#changelogs)
- [Why it needed](#why-it-needed)
- [Features](#features)
- [Usage](#usage)
- [Allure Reports](#allure-reports)
- [Jenkins Docker Set up](#jenkins-docker-set-up)
- [Author](#author)
- [License](#license)

## Changelogs

.....

- 30/11/22: Update collection files
- 29/11/22: Update console log warnings

## Why it needed

There are 2 big obstacles while we want to run multiple Postman collections or multiple environments with multiple reports:
- Multiple line of command line need to be typed and run:
```bash
newman run <collection_1.json>
newman run <collection_2.json> -e <env_1.json>
newman run <collection_3.json> -e <env_2.json>
newman run <collection_4.json> -e <env_3.json>
```
- Need to specify the reporters several times and it is quite time-consuming:
```bash
newman run <collection_1.json> --reporters cli,html,allure --reporter-html-export htmlOutput.html --reporter-allure-export <allure-results-output-dir>
newman run <collection_2.json> -e <env_1.json> --reporters cli,html,allure --reporter-html-export htmlOutput.html --reporter-allure-export <allure-results-output-dir>
...
```
The more collections we want to run, the more pain we get. That's why this repo was here.

## Features
- Run multiple Postman collection files in one time run via feed file
- Generate HTML, JSON and Allure reports (and default newman CLI's report)
- Can be used in Jenkins and Docker

## Usage

Remember to use npm to install the dependencies

```bash
    npm install
```

#### Create feed file

Feed file is a json file where the list of collections need to be run is specified.
Here is sample:

```bash
    {
        "collections":[
            {
                "collection": "../collections/Postman Echo Cookie.postman_collection.json"
            },
            {
                "collection": "../collections/Postman Echo Request.postman_collection.json",
                "environment": "../environments/My Environment.postman_environment.json"
            }

        ]
    }
```
Above collections were exported from default examples of Postman collections.

Collections are in /collections and environments are in /environments.

#### Run feed file

- To run directly using node command:

```bash
    node index.js  "../feeds/feed.json"
```

- To run via script that defined in package.json:
```bash
    npm run test -- "../feeds/feed.json"
```
The -- is to pass the following arguments to the command inside
<p align="center">
    <img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/ins_1.png" width="500px">
</p>
<p align="center">
    <img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/ins_2.png" width="500px">
</p>

- Below error will return if no feed file specified
```console
    Please provide path to the feed file
    Ex: '../feeds/feed.json'
```
<p align="center">
    <img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/ins_3.png" width="500px">
</p>

## Allure Reports

After execution, the Allure reports, newman's default CLI, HTML and JSON reports are generated inside /reports folder. There are many ways we can make use of these reports, for example pushing HTML, JSON to S3 for tracking or store them as result in CI/CD pipeline.

- For Allure report, to view report from the test runs:

```bash
    allure serve reports/allure
```

- To run via script that defined in package.json:
```bash
    npm run allure-serve
```

A temporary host will be generated and a report will be shown from the collected results.
<p align="center">
    <img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/ins_4.png" width="770px">
</p>

#### Clear old report results

- All files under /reports are cleared:
```bash
    npm run clear-report
```
<p align="center">
    <img src="https://github.com/trongtuyen96/newman-postman-multiple-collections/blob/2b714dd03a158338b61e0d4bce059fb9082eb3b0/covers/ins_5.png" width="500px">
</p>

## Jenkins Docker Set up

Sample Docker image - https://hub.docker.com/r/postman/newman
 - From Jenkins bash:
  ```bash
    #!/bin/bash -l
    npm list
    ls
    cd <path_to_the_project>
    npm install
    npm run test -- <feed_file>
 ```
 
 - In Jenkins pipeline, we can specify a slave machine with above Docker image and make it run commands:
 ```bash
     pipeline {
        agent { docker { image 'postman/newman' } }
        stages {
            stage('build') {
                steps {
                    sh 'cd project/'
                    sh 'npm install'
                    sh 'npm run test -- <feed_file>'
                }
            }
        }
    }
 ```

## Author
	
<h4 align="center">
	Tuyen Nguyen - Senior QA Automation Engineer
</h4>
    <h5 align="center">
	<a href="trongtuyen96@gmail.com">trongtuyen96@gmail.com</a>
    </h5>
<p align="center">
	 <a alt="Github" href="https://github.com/trongtuyen96">
    <img src="https://user-images.githubusercontent.com/25218255/47360756-794c1f00-d6fa-11e8-86fa-7b1c2e4dda92.png" width="50">
  </a>
		 <a alt="LinkedIn" href="https://www.linkedin.com/in/tuyennguyen96/">
    <img src="https://user-images.githubusercontent.com/25218255/47360366-8583ac80-d6f9-11e8-8871-219802a9a162.png" width="50">
  </a>
		 <a alt="Facebook" href="https://www.facebook.com/ntrongtuyen96">
    <img src="https://user-images.githubusercontent.com/25218255/47360363-84eb1600-d6f9-11e8-8029-818481536200.png" width="50">
  </a>
</p>

## License
	
~~~~
Copyright 2022 Tuyen Nguyen

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
~~~~
