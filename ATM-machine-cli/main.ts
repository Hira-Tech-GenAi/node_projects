#! /usr/bin/enx node
import chalk from "chalk";
import inquirer from "inquirer";

let myAccountBalance: number = 20000; //Euro
let myAccountPin: number = 1234;

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: chalk.yellowBright("Please Enter your pin"),
    type: "number",
  },
]);
//*2
if (pinAnswer.pin === myAccountPin) {
  console.log(chalk.bgGreenBright.bold("Correct pin code!"));


let operationAns = await inquirer.prompt([
  {
    name: "operations",
    message: chalk.blueBright("Please choose option"),
    type: "list",
    choices: ["withdraw", "check balance", "fast cash"],
  },
]);
//*3
if (operationAns.operations === "withdraw") {
  let amountAns = await inquirer.prompt([
    {
      name: "amount",
      message: chalk.magentaBright("Please Enter Your amount to withdraw"),
      type: "number",
    },
  ]);
  if (amountAns.amount < myAccountBalance) {
    myAccountBalance -= amountAns.amount;
    console.log(
      chalk.bgCyanBright.bold(`Now your balance is: ${myAccountBalance}`)
    );
  } else {
    console.log(chalk.bgRedBright.bold("insufficient balance"));
  }
} else if (operationAns.operations === "check balance") {
  console.log(
    chalk.bgYellowBright.bold(`Your current balance is ${myAccountBalance}`)
  );
} else if (operationAns.operations === "fast cash") {
  let fastCash = await inquirer.prompt([
    {
      name: "fast_option",
      message: chalk.hex("#FFA500")("How much money you want to withdraw"),
      type: "list",
      choices: ["1000", "2000", "5000"],
    },
  ]);
  if (fastCash.fast_option === "1000") {
    myAccountBalance -= fastCash.fast_option;
    console.log(
      chalk.hex(" #e75480")(`Your remaining Balance is ${myAccountBalance}`)
    );
  }
  if (fastCash.fast_option === "2000") {
    myAccountBalance -= fastCash.fast_option;
    console.log(
      chalk.hex(" #e75480")(`Your remaining Balance is ${myAccountBalance}`)
    );
  }
  if (fastCash.fast_option === "5000") {
    myAccountBalance -= fastCash.fast_option;
    console.log(
      chalk.hex(" #e75480")(`Your remaining Balance is ${myAccountBalance}`)
    );
  }
}
}else {
  console.log(chalk.hex("#ff0000")("Invalid pin number"));
}
