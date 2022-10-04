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

  addLead() {
    inquirer.prompt(leadQuestions).then((answers) => {
      this.teamLead = answers;
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

    inquirer.prompt(questions).then((answers) => {
      answers.type = employeeType;
      this.teamRoster.push(answers);
    });
  }

  chooseOption() {
    inquirer.prompt(menuQuestions).then((answers) => {
      switch (answers.selectedOption) {
        case "Add engineer":
          this.addEmployee("Engineer");
          break;
        case "Add intern":
          this.addEmployee("Intern");
          break;
        case "Exit":
          this.exitFlag = true;
          break;
      }
    });
  }
}
