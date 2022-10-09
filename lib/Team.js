const Employee = require("./Employee");
const Manager = require("./manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const inquirer = require("inquirer");
const fs = require("fs");

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
    messsage: "Engineer email:",
    name: "email",
  },

  {
    type: "input",
    messsage: "Engineer github username:",
    name: "engineerGit",
  },
];

// Questions to ask for a team lead
const managerQuestions = [
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
    name: "officeNumber",
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

// The main object to handle team composition
class Team {
  constructor() {
    this.manager = null;
    this.teamRoster = [];
    this.exitFlag = false;
  }

  getManager() {
    return this.manager;
  }

  getTeamRoster() {
    return this.teamRoster;
  }

  //   First thing will be to get the mandatory team lead information
  beginQuestions() {
    inquirer.prompt(managerQuestions).then((answers) => {
      const { name, empID, email, officeNumber } = answers;
      const manager = new Manager(name, empID, email, officeNumber);
      this.manager = manager;

      //   After lead information has been gained, need to select an option
      this.chooseOption();
    });
  }

  addEmployee(employeeRole) {
    let questions = null;
    let newEmployee = null;

    switch (employeeRole) {
      case "Engineer":
        questions = engineerQuestions;
        break;
      case "Intern":
        questions = internQuestions;
        break;
    }

    const employee = inquirer.prompt(questions).then((answers) => {
      console.log(answers);
      let newEmployee;
      if (employeeRole === "Engineer") {
        let { name, empID, email, engineerGit } = answers;
        newEmployee = new Engineer(name, empID, email, engineerGit);
      } else if (employeeRole === "Intern") {
        let { name, empID, email, internSchool } = answers;
        newEmployee = new Intern(name, empID, email, internSchool);
      }
      this.teamRoster.push(newEmployee);
      return newEmployee;
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
          console.log("Done with questions, generating HTML...");
          this.generateHTML();
          break;
      }
    });

    return option;
  }

  // Generates HTML from a given team roster
  generateHTML() {
    console.log("generateHTML was called");
    let managerCard = `<!-- Manager -->
      <div class="card">
        <div class="image">
          <img src="../assets/images/manager.jpeg" />
        </div>
        <div class="content">
          <div class="header">${this.getManager().name}</div>
          <div class="meta">
            <a>Team Lead</a>
          </div>
          <div class="description">
              <!-- // Name, employee ID, email, office number -->
            <ul>
              <li>Employee ID: ${this.getManager().getID()}</li>
              <li>Email: <a href="mailto:${this.getManager().getEmail()}">${this.getManager().getEmail()}</a></li>
              <li>Office: ${this.getManager().getOffice()}</li>
            </ul>
          </div>
        </div>
      </div>`;

    console.log(`
      
      About to generate employee cards using the roster:
      ${() => this.getTeamRoster()}
  
      `);

    const employeeCards = this.teamRoster.map((employee) => {
      let employeeHTML = null;
      switch (employee.getRole()) {
        case "Engineer":
          employeeHTML = `<!-- Sample Engineer -->
                  <div class="card">
                    <div class="image">
                      <img
                        src="../assets/images/engineer.jpeg"
                      />
                    </div>
                    <div class="content">
                      <div class="header">${employee.getName()}</div>
                      <div class="meta">
                        <a>Engineer</a>
                      </div>
                      <div class="description">
                          <!-- // Name, employee ID, github username -->
      
                        <ul>
                          <li>Employee ID: ${employee.getID()}</li>
                          <li>Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                          <li>Github: <a href="https://github.com/${employee.getGitHub()}">${employee.getGitHub()}</a></li>
      
                        </ul>
                      </div>
                    </div>
                  </div>
      `;
          break;
        case "Intern":
          employeeHTML = `<!-- Sample Intern -->
                  <div class="card">
                    <div class="image">
                      <img
                        src="../assets/images/intern.jpeg"
                      />
                    </div>
                    <div class="content">
                      <div class="header">${employee.getName()}</div>
                      <div class="meta">
                        <a>Intern</a>
                      </div>
                      <div class="description">
                          <!-- // Name, employee ID, email, school -->
                          <ul>
                              <li>Employee ID: ${employee.getID()}</li>
                              <li>Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                              <li>School: ${employee.getSchool()}</li>
      
                          </ul>
                      </div>
                    </div>
                  </div>`;
          break;
      }
      console.log(
        `
  
          generateHTML has generated this for employeeHTML:
          ${employeeHTML}
  
          `
      );
      return employeeHTML;
    });

    console.log(`About to call htmlcontent with:
      -leadCard = 
      ${managerCard}
      -employeeCards = 
      ${employeeCards.join("")}`);
    let htmlContent = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Team Roster</title>
      
          <!-- Semantic UI -->
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
      
          <!-- Custom CSS -->
          <link rel="stylesheet" href="./index.css" />
        </head>
        <body>
          <div class="ui container">
            <div class="ui equal width grid" id="cardContainer">
              <div class="ui centered row" id="teamHeader">The team:</div>
              <div class="ui centered row" id="membersRow">
              <div class="ui link centered cards" id="members">
                  
                  ${managerCard}
  
                  ${employeeCards.join("")}
      
                </div>
              </div>
            </div>
          </div>
      
          <!-- jQuery -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      
          <!-- Semantic UI -->
          <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
      
          <!-- Custom JS -->
          <script src="./assets/js/indexHTML.js"></script>
        </body>
      </html>
      `;

    Promise.all([this.getManager(), ...this.getTeamRoster()]).then(() => {
      fs.writeFile("./dist/index.html", htmlContent, (err) =>
        err ? console.error(err) : console.log("Success!")
      );
    });
  }
}

module.exports = Team;
