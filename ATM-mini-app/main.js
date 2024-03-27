#! /usr/bin/enx node
import inquirer from "inquirer";
let myAccountBalance = 20000; //Euro
let myAccountPin = 9110;
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin",
        type: "number",
    },
]);
//*2
if (pinAnswer.pin === myAccountPin) {
    console.log("Correct pin code!");
    let operationAns = await inquirer.prompt([
        {
            name: "operations",
            message: "please choose option",
            type: "list",
            choices: ["withdraw", "check balance", "fast cash"],
        },
    ]);
    //*3
    if (operationAns.operations === "withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Your amount to withdraw",
                type: "number",
            },
        ]);
        if (amountAns.amount < myAccountBalance) {
            myAccountBalance -= amountAns.amount;
            console.log(`Now your balance is: ${myAccountBalance}`);
        }
        else {
            console.log("insufficient balance");
        }
    }
    else if (operationAns.operations === "check balance") {
        console.log(`Your current balance is ${myAccountBalance}`);
    }
    else if (operationAns.operations === "fast cash") {
        let fastCash = await inquirer.prompt([
            {
                name: "fast_option",
                message: "How much money you want to withdraw",
                type: "list",
                choices: ["1000", "2000", "5000"],
            },
        ]);
        if (fastCash.fast_option === "1000") {
            myAccountBalance -= fastCash.fast_option;
            console.log(`Your remaining Balance is ${myAccountBalance}`);
        }
        if (fastCash.fast_option === "2000") {
            myAccountBalance -= fastCash.fast_option;
            console.log(`Your remaining Balance is ${myAccountBalance}`);
        }
        if (fastCash.fast_option === "5000") {
            myAccountBalance -= fastCash.fast_option;
            console.log(`Your remaining Balance is ${myAccountBalance}`);
        }
    }
    else {
        console.log("Invalid pin number");
    }
}
