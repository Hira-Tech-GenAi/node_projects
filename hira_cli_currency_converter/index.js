#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//***Currency Converter API link
let apiLink = "https://v6.exchangerate-api.com/v6/20a83004552edd35702b2986/latest/PKR";
//***Created a function to Fetch the data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let conversionRateData = await fetchData(apiLink);
//***Now I want countries list which is "OBJECT" and I want to convert it to "ARRAY"
let countriesArray = Object.keys(conversionRateData);
//***Now we will take the "Input" from user to select first country
let selectFirstCountry = await inquirer.prompt([
    {
        type: "list",
        name: "firstCountryName",
        message: chalk.bgBlueBright(`Converting From =>`),
        choices: countriesArray,
    },
]);
//***Now we will take "Input" from user to amount
let userAmount = await inquirer.prompt([
    {
        type: "number",
        name: "rupees",
        message: `Please enter your amount in ${chalk.greenBright.bold(selectFirstCountry.firstCountryName)} ?`,
    },
]);
//***Now we will take the "Input" from user to select second country
let selectSecondCountry = await inquirer.prompt([
    {
        type: "list",
        name: "secondCountryName",
        message: chalk.bgGreenBright(`Converting To =>`),
        choices: countriesArray,
    },
]);
//***Now we need conversion_rates
let ConversionRateLink = `https://v6.exchangerate-api.com/v6/20a83004552edd35702b2986/pair/${selectFirstCountry.firstCountryName}/${selectSecondCountry.secondCountryName}`;
//***Fetch data for conversion_rate (Created a function to Fetch the data)
let dataConversionRate = async (data) => {
    let dataConversionRate = await fetch(data);
    let response = await dataConversionRate.json();
    return response.conversion_rate;
};
let conversionRate = await dataConversionRate(ConversionRateLink);
//***user amount multiply by conversionRate
let convertedRate = userAmount.rupees * conversionRate;
console.log(`Your ${chalk.yellowBright.bold(selectFirstCountry.firstCountryName)} ${chalk.yellowBright.bold(userAmount.rupees)} ${chalk.yellowBright.bold(selectSecondCountry.secondCountryName)} ${chalk.yellowBright.bold(convertedRate)}`);
//*** Apply number method(toFixed())
let accurateAmount = convertedRate.toFixed(2);
console.log(chalk.bgCyanBright.bold(accurateAmount));
