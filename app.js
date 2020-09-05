const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

let managers = 0;
let engineers = 0;
let interns = 0;

let currentIndex = 0;

let employeeID = 0;

const questions = [
    {
        type: 'number',
        name: 'managers',
        message: "Enter the number of managers in your organization.",
    },
    {
        type: 'number',
        name: 'engineers',
        message: "Enter the number of engineers in your organization.",
    },
    {
        type: 'number',
        name: 'interns',
        message: "Enter the number of interns in your organization.",
    }
]

const managerInputs = [
    {
        type: 'input',
        name: 'name',
        message: `Enter Manager's name.`
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter Manager's email.`
    },
    {
        type: 'input',
        name: 'officePhone',
        message: `Enter Manager's office phone number.`
    }
]

const engineerInputs = [
    {
        type: 'input',
        name: 'name',
        message: `Enter Engineer's name.`
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter Engineer's email.`
    },
    {
        type: 'input',
        name: 'github',
        message: `Enter Engineer's github username.`
    }
]


const internInputs = [
    {
        type: 'input',
        name: 'name',
        message: `Enter Intern's name.`
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter Intern's email.`
    },
    {
        type: 'input',
        name: 'school',
        message: `Enter Intern's school.`
    }
]

function assignID() {
    employeeID++;
    return employeeID;
}

function gatherInfo() {
    inquirer.prompt(questions).then((answers) => {

        managers = answers.managers;
        engineers = answers.engineers;
        interns = answers.interns;

        gatherManagerInfo();
    });
}


function gatherManagerInfo() {

    if (currentIndex < managers) {
        inquirer.prompt(managerInputs)
            .then(answers => {
                // Create a new manager and push to our employee array
                const manager = new Manager(answers.name, answers.email, assignID(), answers.officePhone);
                employeeArray.push(manager);
                currentIndex++;
                gatherManagerInfo();
            });
    } else {

        // Reset the index and move to the next step
        currentIndex = 0;
        gatherEngineerInfo();
    }
}

function gatherEngineerInfo(){

    if (currentIndex < engineers) {
        inquirer.prompt(engineerInputs)
            .then(answers => {
                // Create a new manager and push to our employee array
                const engineer = new Engineer(answers.name, answers.email, assignID(), answers.github);
                employeeArray.push(engineer);
                currentIndex++;
                gatherEngineerInfo();
            });
    } else {

        // Reset the index and move to the next step
        currentIndex = 0;
        gatherInternInfo();
    }

}

function gatherInternInfo(){

    if (currentIndex < interns) {
        inquirer.prompt(internInputs)
            .then(answers => {
                // Create a new manager and push to our employee array
                const intern = new Intern(answers.name, answers.email, assignID(), answers.school);
                employeeArray.push(intern);
                currentIndex++;
                gatherInternInfo();
            });
    } else {

        // Reset the index and move to the next step
        currentIndex = 0;
        console.log("Done gathering team info!")
    }

}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

gatherInfo();












// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
