#! /usr/bin/env/ node
import chalk from "chalk";
import inquirer from "inquirer";

let toDoList: string[] = [];
let loop = true;

//************ Use while loop (Select Options)**************//

while (loop === true) {
  let Option = await inquirer.prompt([
    {
      type: "list",
      name: "userOption",
      message: chalk.yellowBright("Select an option"),
      choices: ["Add", "Remove", "Update"],
    },
  ]);

  //************  Add  ***********//

  if (Option.userOption === "Add") {
    let answers = await inquirer.prompt([
      {
        type: "input",
        name: "userAnswer",
        message: chalk.greenBright("Add your ToDo in the list"),
      },
    ]);

    if (answers.userAnswer !== "") {
      toDoList.push(answers.userAnswer);
      console.log(chalk.blueBright.bold("\nTask added."));
      console.log(chalk.bold("\n\tUpdated List:"));
      toDoList.forEach((item)=>{
      console.log(chalk.greenBright(`\t- ${item}`));
      
    });
    console.log("\n");
    
      
    } else {
      console.log(
        chalk.bgRedBright.bold("Kindly add something in ToDo list!")
      );
    }
 

    //************  Remove  ************//
  } else if (Option.userOption === "Remove") {
    if(toDoList.length > 0){
    let removeChoice = await inquirer.prompt([
      {
        type: "list",
        name: "removeTodoItem",
        message: chalk.cyanBright("\nSelect item to remove."),
        choices: toDoList,
      },
    ]);
    let idxItemToRemove = toDoList.indexOf(removeChoice.removeTodoItem);
    if (idxItemToRemove >= 0) {
      toDoList.splice(idxItemToRemove, 1);
      console.log(chalk.bgRedBright.bold("You removed : ",removeChoice.removeTodoItem));
      console.log(chalk.bold("\n\tUpdated List:"));
      toDoList.forEach((item)=>{
        console.log(chalk.greenBright(`\t- ${item}`));
        
      });
      console.log("\n");
      
    }
  }else{
    console.log(chalk.yellowBright("\n\tYour To-Dos list is Empty. Add To-Dos before removing.\n"));
    
  }

     //************ Update ************//
}else if(Option.userOption === "Update"){
  if(toDoList.length > 0){
    let showUpdate = await inquirer.prompt([{
      type:"list",
      name:"updateItem",
      message:"\nSelect an item to updated ToDo:",
      choices: toDoList,
    },
  ]);
  let index = toDoList.indexOf(showUpdate.updateItem);
  let editTodoVal = await inquirer.prompt([{
    type:"input",
    name:"editItem",
    message: "\nEnter the updated ToDos:",
  },
]);
if(editTodoVal.editItem !== ""){
  toDoList[index] = editTodoVal.editItem;
 console.log(chalk.green.italic("\nToDos updated successfully."));
        console.log(chalk.bold("\n\tUpdated ToDo List:"));
        toDoList.forEach((item) => {
          console.log(chalk.greenBright(`\t- ${item}`));
        });
        console.log("\n");
      } else {
        console.log(chalk.red.bold("\nYou cannot update to an empty item!.\n"));
      }
    } else {
      console.log(chalk.yellow("\n\tThe To-Do list is Empty. Please add tasks before updating.\n"));
    }
  }

  // ----------------------------------- Confirmation -----------------------------------
  let userAns = await inquirer.prompt([
    {
      type: "confirm",
      name: "selection",
      message: "Do you want to continue?",
      default: true,
    },
  ]);

  if (userAns.selection === false) {
   loop = false;
  }
}

console.log(chalk.yellow.bold("\n\tThank you for Try this To-Do List. "));


