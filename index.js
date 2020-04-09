const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const converterToPdf = require("electron-html-to")
const api = require("./api");
const generateHTML = require("./generateHTML");
const open = require("open");

//Does questions in terminal
const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your Github username?"
    },

    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
];

function writeToFile(fileName, data) {
    return fs.writeFilesSync(path.join(jprocess.cwd(), fileName), data);
}

//initiates the program to search Github for account
function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
        console.log("Searching...");
        //Fetches user information
        api.getUser(github)
            .then(response =>
                api.getTotalStars(github).then(stars => {
                    return generateHTML({
                        stars,
                        color,
                        ...response.data
                    });
                })
            )
            //Generates information into a PDF
            .then(html => {
                const conversion = converterToPdf({
                    converterPath: converterToPdf.converters.PDF
                });

                conversion({ html }, function (err, result) {
                    if (err) {
                        return console.error(err);
                    }
                    //saves file into a PDF file within program file
                    result.stream.pipe(
                        fs.createWriteStream(path.join(__dirname, "resume.pdf"))
                    );
                    //Stops conversion program
                    conversion.kill();
                });
                //Opens pdf in default browser
                open(path.join(process.cwd(), "resume.pdf"));
            })
    })
}

init();
