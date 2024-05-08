#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//Create a class of student
class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

//Create another class of person
class Person {
  students: Student[] = [];
  //create a function to push student in object
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}
//initialize person
const persons = new Person();

//create function start program
const startProgram = async (persons: Person) => {
  do {
    console.log(`Welcome User 👋`);

    //===Get input from user to use inquirer
    const answer = await inquirer.prompt({
      type: "list",
      message: chalk.bold.italic.yellow("Who would you like to talk to ? 💬"),
      name: "select",
      choices: ["byMySelf", "Student"],
    });
    //Give condition

    if (answer.select == "byMySelf") {
      console.log("Hello I talk by myself 🦜");
      console.log("I am fine today 🙂");
    }
    if (answer.select == "Student") {
      //ask que and get input
      const answer = await inquirer.prompt({
        type: "input",
        message: chalk.bold.italic.red("Who would you like to talk to ? 💬"),
        name: "student",
      });

      //find student
      const student = persons.students.find(
        (val) => val.name == answer.student
      );

      // Check through the condition that student is in or not
      if (!student) {
        const addStudentName = new Student(answer.student);
        persons.addStudent(addStudentName);
        console.log(`Hello I am 👋 ${addStudentName.name} and I am well.`);
        console.log(persons.students);
      }
      if (student) {
        console.log(`Hello I am 👋 ${student.name} and I am well......`);
        console.log(persons.students);
      }
    }
  } while (true);
};

// call the function
startProgram(persons);
