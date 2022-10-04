const inquirer = require("inquirer");

// Questions to ask for an engineer
const engineerQuestions = [
  // Name, employee ID, github username
  {
    type: "input",
    messsage: "Engineer name:",
    name: "name",
  },
  {
    type: "input",
    messsage: "Engineer employee ID:",
    name: "empID",
  },
  {
    type: "input",
    messsage: "Engineer github username:",
    name: "engineerGit",
  },
];

// Questions to ask for a team lead
const leadQuestions = [
  // Name, employee ID, email, office number
  {
    type: "input",
    messsage: "Team lead name:",
    name: "name",
  },
  {
    type: "input",
    messsage: "Team lead employee ID:",
    name: "empID",
  },
  {
    type: "input",
    messsage: "Team lead email:",
    name: "email",
  },
  {
    type: "input",
    messsage: "Team lead office:",
    name: "leadOffice",
  },
];

// Questions to ask for an intern
const internQuestions = [
  // Name, employee ID, email, school
  {
    type: "input",
    messsage: "Intern name:",
    name: "name",
  },
  {
    type: "input",
    messsage: "Intern employee ID:",
    name: "empID",
  },
  {
    type: "input",
    messsage: "Intern email:",
    name: "email",
  },
  {
    type: "input",
    messsage: "Intern school:",
    name: "internSchool",
  },
];

// Questions for program main options
const menuQuestions = [
  {
    type: "list",
    message: "Select option:",
    choices: ["Add engineer", "Add intern", "Exit"],
    name: "selectedOption",
  },
];

// Generic class of employee for common parameters
class Employee {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

// Intern gets additional email and school info
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id);
    this.email = email;
    this.school = school;
  }
}

// Engineer gets additional github info
class Engineer extends Employee {
  constructor(name, id, gitName) {
    super(name, id);
    this.gitName = gitName;
  }
}

// TeamLead gets additional email and office number
class TeamLead extends Employee {
  constructor(name, id, email, office) {
    super(name, id);
    this.email = email;
    this.office = office;
  }
}

// The main object to handle team composition
class Team {
  constructor() {
    this.teamLead = null;
    this.teamRoster = [];
    this.exitFlag = false;
  }

  //   First thing will be to get the mandatory team lead information
  beginQuestions() {
    inquirer.prompt(leadQuestions).then((answers) => {
      this.teamLead = answers;

      //   After lead information has been gained, need to select an option
      this.chooseOption();
    });
  }

  addEmployee(employeeType) {
    let questions;
    let empType;

    switch (employeeType) {
      case "Engineer":
        questions = engineerQuestions;
        break;
      case "Intern":
        questions = internQuestions;
        break;
    }

    const employee = inquirer.prompt(questions).then((answers) => {
      answers.type = employeeType;
      this.teamRoster.push(answers);
    });

    return employee;
  }

  //   Allows user to select whether to add an intern, an engineer, or stop
  chooseOption() {
    const option = inquirer.prompt(menuQuestions).then((answers) => {
      let employee;
      switch (answers.selectedOption) {
        case "Add engineer":
          console.log("\nAdd information about engineer:");
          // Add the engineer and then ask again
          this.addEmployee("Engineer").then(() => {
            this.chooseOption();
          });
          break;
        case "Add intern":
          console.log("\nAdd information about intern:");
          // Add the intern and then ask again
          this.addEmployee("Intern").then(() => {
            this.chooseOption();
          });
          break;
        case "Exit":
          this.exitFlag = true;
          console.log(this);
          console.log('Done with questions, generating HTML...')
          this.generateHTML()
          break;
      }
    });

    return option;
  }

  // Generates HTML from a given team roster
  generateHTML() {
    console.log('generateHTML was called')

  }
}



// Orchestrates control flow for program
function init() {
  const newTeam = new Team();
  console.log("Welcome! Enter information about the team lead");
  newTeam.beginQuestions();
}

// Initiates program
init();
