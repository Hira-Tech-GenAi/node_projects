#! /usr/bin/env node
import chalk from "chalk"; //installed package npm i chalk
import { differenceInSeconds } from "date-fns"; //installed  package npm i date-fns
import inquirer from "inquirer"; //installed npm i inquirer
const response = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: chalk.greenBright.italic("Please enter the amount of second"),
    validate: (input) => {
        // add validation that user not enter long second amount and alphabets!
        if (isNaN(input)) {
            return `Please enter valid number!`;
        }
        else if (input > 60) {
            return `limits of seconds is "60" seconds!`;
        }
        else {
            return true;
        }
    },
});
let value = response.userInput;
//create a function
function startTimer(val) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log(`Time has expired`);
            process.exit(); //to use this method to stop this process
        }
        const minute = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const seconds = Math.floor(timeDifference % 60);
        console.log(`${minute.toString().padStart(2, "0")}: ${seconds
            .toString()
            .padStart(2, "0")}`); //change minute toString and use string method padStart convert into two numbers and add 0 string
    }, 1000); //this function execute after one second every second
}
//call the function
startTimer(value);
