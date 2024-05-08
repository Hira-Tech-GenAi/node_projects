#! /usr/bin/env node
import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
import chalk from "chalk";

//Create a class of customer
class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  contactNumber: number;
  accountNumber: number;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    contactNumber: number,
    accountNumber: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.contactNumber = contactNumber;
    this.accountNumber = accountNumber;
  }
}

//Create interface for BankAccount
interface BankAccount {
  accountNum: number;
  bankBalance: number;
}

//Create a class of Bank
class Bank {
  customer: Customer[] = [];
  account: BankAccount[] = [];

  //create a function to add customer
  addCustomer(obj: Customer) {
    this.customer.push(obj);
  }
  //create a function to add Account number
  addAccountNumber(obj: BankAccount) {
    this.account.push(obj);
  }

  //create Transaction function
  transaction(accObj: BankAccount) {
    let newAccounts = this.account.filter(
      (acc) => acc.accountNum !== accObj.accountNum
    );
    //update this account
    this.account = [...newAccounts, accObj];
  }
}

//Bank Name
let UnitedBank = new Bank();

//Create first customer
// let customer1 = new Customer("Hira", "Khalid", 34, "female", 12345, 925342910)

// Create customer more than one we use for-loop
for (let i: number = 1; i <= 5; i++) {
  let fName = faker.person.firstName("female");
  let lName = faker.person.lastName();
  let contactNum = parseInt(faker.string.numeric("11111111111")); //generate automatic mob number// parseInt change the string to num
  const customers = new Customer(
    fName,
    lName,
    22 * i,
    "female",
    contactNum,
    1000 + i
  );
  UnitedBank.addCustomer(customers);
  UnitedBank.addAccountNumber({
    accountNum: customers.accountNumber,
    bankBalance: 100 * i,
  });
}
//Create Bank Functionality
async function bankService(bank: Bank) {
  do {
    let service = await inquirer.prompt({
      type: "list",
      name: "select",
      message: chalk.green.italic("Kindly select your desired Service! 📋 "),
      choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"],
    });
    //check conditions
    //View Balance
    if (service.select == "View Balance") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accountNum",
        message: chalk.yellow.italic("Kindly Enter your Account Number: "),
      });
      //find account number
      let account = UnitedBank.account.find(
        (acc) => acc.accountNum == response.accountNum
      );
      //use if conditional statement
      if (!account) {
        console.log(chalk.red.bold("Invalid Account Number ⚠️"));
      }
      if (account) {
        let name = UnitedBank.customer.find(
          (item) => item.accountNumber == account?.accountNum
        );
        console.log(
          `Dear "${chalk.blue.italic.bold(name?.firstName)} ${chalk.cyan.italic(
            name?.lastName
          )} your Account Balance is ${chalk.bold.bgMagenta(
            `💲${account.bankBalance}`
          )}`
        );
      }
    }
    // Cash Withdraw
    if (service.select == "Cash Withdraw") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accountNum",
        message: chalk.yellow.italic("Kindly Enter your Account Number: "),
      });
      //find account number
      let account = UnitedBank.account.find(
        (acc) => acc.accountNum == response.accountNum
      );
      //use if conditional statement
      if (!account) {
        console.log(chalk.red.bold("Invalid Account Number ⚠️"));
      }
      if (account) {
        let answer = await inquirer.prompt({
          type: "number",
          message: "Kindly Enter your Amount.",
          name: "amount",
        });
        if (answer.amount > account.bankBalance) {
          console.log(chalk.red.bold("Insufficient Balance ⚠️"));
        }

        let newBalance = account.bankBalance - answer.amount;

        //Transaction method call
        bank.transaction({
          accountNum: account.accountNum,
          bankBalance: newBalance,
        });
        console.log(newBalance);
      }
    }

    // Cash  Deposit

    if (service.select == "Cash Deposit") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accountNum",
        message: chalk.yellow.italic("Kindly Enter your Account Number: "),
      });
      //find account number
      let account = UnitedBank.account.find(
        (acc) => acc.accountNum == response.accountNum
      );
      //use if conditional statement
      if (!account) {
        console.log(chalk.red.bold("Invalid Account Number ⚠️"));
      }
      if (account) {
        let answer = await inquirer.prompt({
          type: "number",
          message: "Kindly Enter your Amount.",
          name: "amount",
        });

        let newBalance = account.bankBalance + answer.amount;

        //Transaction method call
        bank.transaction({
          accountNum: account.accountNum,
          bankBalance: newBalance,
        });
        console.log(newBalance);
      }
    }
    if (service.select == "Exit") {
      return;
    }
  } while (true);
}

bankService(UnitedBank);
