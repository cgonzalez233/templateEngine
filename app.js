const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const team = [];

// array of questions for user
function teamMaker() {
  const createManager = async () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the name of the Manager?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the ID of the Manager?",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the email of the Manager?",
        },
        {
          type: "input",
          name: "managerOffice",
          message: "What is the office number of the Manager?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOffice
        );
        team.push(manager);
        addTeam();
      });
  };

  const createEngineer = async () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the name of the Engineer?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is the ID of the Engineer?",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is the email of the Engineer?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is the Github username of the Engineer?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineer
        );
        team.push(engineer);
        addTeam();
      });
  };

  const createIntern = async () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the name of the Intern?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is the ID of the Intern?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is the email of the Intern?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What school does the Intern go to?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        team.push(intern);
        addTeam();
      });
  };

  function addTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "addMember",
          message: "Would you like to add more team members?",
          choices: ["Engineer", "Intern", "I have my full team"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.addMember) {
          case "Engineer":
            createEngineer();
            break;
          case "Intern":
            createIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function buildTeam() {
    const HTML = render(team);

    writeFileAsync("team.html", HTML);

    console.log("Successfully wrote to index.html");
  }
  createManager();
}

// function call to initialize program
teamMaker();
