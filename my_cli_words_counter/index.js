#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Create a function
function wordsCounter(paragraph) {
    let removeWhiteSpaces = paragraph.replace(/\s/g, ""); // use Regex remove all free spaces from paragraph.
    return removeWhiteSpaces.length;
}
//Input text from user and do-while (condition infinite(true))
async function startWordCounter(wordsCounter) {
    do {
        let response = await inquirer.prompt({
            type: "input",
            message: chalk.bgCyanBright("Plz write your Paragraph here...."),
            name: "paragraph",
        });
        console.log(wordsCounter(chalk.greenBright(response.paragraph)));
    } while (true);
}
startWordCounter(wordsCounter);
