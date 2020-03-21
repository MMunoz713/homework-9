const fs = require("fs");
const inquirer = require("inquirer");
const converterToPdf = require("electron-html-to")
const api = require("./api");
const generateHTML = require("./generateHTML");


const 
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
 
}

function init() {

init();
