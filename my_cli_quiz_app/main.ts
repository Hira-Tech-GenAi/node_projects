#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let apiLink: string =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

//Now fetch Data from this API so create a Function

let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  //convert this data to JASON
  let response = await fetchQuiz.json();
  //now return
  return response.results;
};
let data = await fetchData(apiLink);
// console.log(a.result); // Check that Data is coming!
//create a function
let startQuiz = async () => {
  let score: number = 0;
  //for plyer name
  let name = await inquirer.prompt({
    type: "input",
    name: "fullName",
    message: chalk.yellowBright("what is your name?"),
  });
  //use for loop
  for (let i = 1; i < 5; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];
    let quizAnswers = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val),
    });
    //check condition
    if (quizAnswers.quiz == data[i].correct_answer) {
      ++score;
      console.log(chalk.bold.italic.greenBright("Correct"));
    } else {
      console.log(
        `(correct answer is )${chalk.bold.italic.redBright(
          data[i].incorrect_answers
        )}`
      );
    }
  }
  console.log(`Dear ${chalk.cyanBright.bold(name.fullName)}, your score is ${chalk.red.bold(score)} out of ${chalk.red.bold("5")}`);
};
startQuiz();
