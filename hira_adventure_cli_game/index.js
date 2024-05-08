#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//create a class for player
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    //function for minus and update player fuel:
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
    //another function to Increase Fuel:
    fuelIncrease() {
        this.fuel = 100;
    }
}
//create a class for Opponent
class Competitor {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
}
//Player name and select competitor
let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please Enter Your Name:",
});
let competitor = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select Your Opponent:",
    choices: ["Zombie", "Skeleton", "RedSkull"],
});
//Let gather Data:
let p1 = new Player(player.name);
let p2 = new Competitor(competitor.select);
//----------- Use do-while loop to continue this game---------
//-----------Opponent"Skeleton"-----------
do {
    if (competitor.select == "Skeleton") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select Your Option:",
            choices: ["Attack", "Drink Portion", "Run For Your Life..."],
        });
        //   ___________Option Attack_________________
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            //use nested if(){}
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${chalk.bold.yellow(`${p1.name} fuel is ${p1.fuel}`)}`);
                console.log(`${chalk.bold.green(`${p2.name} fuel is ${p2.fuel}`)}`);
                if (p1.fuel <= 0) {
                    console.log(chalk.red.bold.italic("You loose! Try again your luck"));
                }
            }
            if (num <= 0) {
                p2.fuelDecrease();
                console.log(`${chalk.bold.yellow(`${p1.name} fuel is ${p1.fuel}`)}`);
                console.log(`${chalk.bold.green(`${p2.name} fuel is ${p2.fuel}`)}`);
                if (p2.fuel <= 0) {
                    console.log(chalk.cyan.bold.italic(" Congrats You win!"));
                    //--------Process end on win situation------
                    process.exit();
                }
            }
        }
        //   ___________Option Drink Portion_________________
        if (ask.option == "Drink Portion") {
            p1.fuelIncrease();
            console.log(chalk.bold.italic.green(`You Drink Health Portion Your fuel is ${p1.fuel}`));
        }
        //   ___________Option Run For Your Life..._________________
        if (ask.option == "Run For Your Life...") {
            console.log(chalk.red.bold.italic("You loose! Try again your luck"));
            //--------Process end on loose situation------
            process.exit();
        }
    }
    //-------------Opponent "Zombie"------
    if (competitor.select == "Zombie") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select Your Option:",
            choices: ["Attack", "Drink Portion", "Run For Your Life..."],
        });
        //   ___________Option Attack_________________
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            //use nested if(){}
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`)}`);
                console.log(`${chalk.bold.green(`${p2.name} fuel is ${p2.fuel}`)}`);
                if (p1.fuel <= 0) {
                    console.log(chalk.red.bold.italic("You loose! Try again your luck"));
                }
            }
            if (num <= 0) {
                p2.fuelDecrease();
                console.log(`${chalk.bold.red(`${p2.name} fuel is ${p2.fuel}`)}`);
                console.log(`${chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`)}`);
                if (p2.fuel <= 0) {
                    console.log(chalk.cyan.bold.italic(" Congrats You win!"));
                    //--------Process end on win situation------
                    process.exit();
                }
            }
        }
        //   ___________Option Drink Portion_________________
        if (ask.option == "Drink Portion") {
            p1.fuelIncrease();
            console.log(chalk.bold.italic.green(`You Drink Health Portion Your fuel is ${p1.fuel}`));
        }
        //   ___________Option Run For Your Life..._________________
        if (ask.option == "Run For Your Life...") {
            console.log(chalk.red.bold.italic("You loose! Try again your luck"));
            //--------Process end on loose situation------
            process.exit();
        }
    }
    //-------------Opponent "RedSkull"------
    if (competitor.select == "RedSkull") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select Your Option:",
            choices: ["Attack", "Drink Portion", "Run For Your Life..."],
        });
        //   ___________Option Attack_________________
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            //use nested if(){}
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`)}`);
                console.log(`${chalk.bold.green(`${p2.name} fuel is ${p2.fuel}`)}`);
                if (p1.fuel <= 0) {
                    console.log(chalk.red.bold.italic("You loose! Try again your luck"));
                }
            }
            if (num <= 0) {
                p2.fuelDecrease();
                console.log(`${chalk.bold.red(`${p2.name} fuel is ${p2.fuel}`)}`);
                console.log(`${chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`)}`);
                if (p2.fuel <= 0) {
                    console.log(chalk.cyan.bold.italic(" Congrats You win!"));
                    //--------Process end on win situation------
                    process.exit();
                }
            }
        }
        //   ___________Option Drink Portion_________________
        if (ask.option == "Drink Portion") {
            p1.fuelIncrease();
            console.log(chalk.bold.italic.green(`You Drink Health Portion Your fuel is ${p1.fuel}`));
        }
        //   ___________Option Run For Your Life..._________________
        if (ask.option == "Run For Your Life...") {
            console.log(chalk.red.bold.italic("You loose! Try again your luck"));
            //--------Process end on loose situation------
            process.exit();
        }
    }
} while (true);
