const Team = require("../lib/Team");
const Manager = require("../lib/Manager");
const Intern = require("../lib/Intern");
const Engineer = require("../lib/Engineer");
const inquirer = require("inquirer");

// Questions to ask for an engineer
const engineerQuestions = [
  // Name, employee ID, email, github username
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

// Questions to ask for a Manager
const managerQuestions = [
  // Name, employee ID, email, office number
  {
    type: "input",
    messsage: "Manager name:",
    name: "name",
  },
  {
    type: "input",
    messsage: "Manager employee ID:",
    name: "empID",
  },
  {
    type: "input",
    messsage: "Manager email:",
    name: "email",
  },
  {
    type: "input",
    messsage: "Manager office:",
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

// Starts by asking the user for required manager information and return the Manager object
async function getManagerInfo() {
  let managerInfo = await inquirer.prompt(managerQuestions);
  const { name, empID, email, officeNumber } = managerInfo;
  let manager = new Manager(name, empID, email, officeNumber);
  return manager;
}

// Prompt the user to select an action to perform on the team
async function chooseMenuOption() {
  console.log("Please choose what to do:\n");
  let options = await inquirer.prompt(menuQuestions);
  return options.selectedOption;
}

// Repeatedly ask the user to add members to the team until they select the Exit option
async function menuCycle(team) {
  let option = await chooseMenuOption();
  switch (option) {
    case "Add engineer":
      let newEngineer = await getEngineer();
      team.addMember(newEngineer);
      console.log(`\nAdded engineer, going back to the menu\n`);
      await menuCycle(team);
      break;
    case "Add intern":
      let newIntern = await getIntern();
      team.addMember(newIntern);
      console.log(`\nAdded intern, going back to the menu\n`);
      await menuCycle(team);
      break;
    case "Exit":
      console.log(`Done getting team info, generating HTML...`);
      break;
  }
}

// Prompts the user for information needed to make an Engineer object
async function getEngineer() {
  const engineerInfo = await inquirer.prompt(engineerQuestions);
  let { name, empID, email, engineerGit } = engineerInfo;
  let newEngineer = new Engineer(name, empID, email, engineerGit);
  return newEngineer;
}

// Prompts the user for information needed to make an Intern object
async function getIntern() {
  const internInfo = await inquirer.prompt(internQuestions);
  let { name, empID, email, internSchool } = internInfo;
  let newIntern = new Intern(name, empID, email, internSchool);
  return newIntern;
}

// Takes a finalized team roster and generates the HTML for the final page
function generateHTML(team) {
  // Semantic UI card for a manager
  const managerCard = `<!-- Manager -->
      <div class="card">
        <div class="image">
          <img src="../assets/images/manager.jpeg" />
        </div>
        <div class="content">
          <div class="header">${team.getManager().getName()}</div>
          <div class="meta">
            <a>Team Lead</a>
          </div>
          <div class="description">
              <!-- // Name, employee ID, email, office number -->
            <ul>
              <li>Employee ID: ${team.getManager().getID()}</li>
              <li>Email: <a href="mailto:${team.getManager().getEmail()}">${team.getManager().getEmail()}</a></li>
              <li>Office: ${team.getManager().getOffice()}</li>
            </ul>
          </div>
        </div>
      </div>`;

  // Semantic UI cards for a Engineers and Interns
  const employeeCards = team.getTeamRoster().map((employee) => {
    let employeeHTML = null;
    switch (employee.getRole()) {
      case "Engineer":
        employeeHTML = `<!-- Engineer -->
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
        employeeHTML = `<!-- Intern -->
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
    return employeeHTML;
  });

  // Final page content, including cards for all employees added to the middle
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
  return htmlContent;
}

module.exports = {
  getManagerInfo,
  chooseMenuOption,
  getEngineer,
  getIntern,
  menuCycle,
  generateHTML,
};
