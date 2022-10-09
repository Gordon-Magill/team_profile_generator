const {Team, } = require("./lib/Team.js");

// Orchestrates control flow for program
function init() {
  console.log(Team)
  const team = new Team();
  console.log("Welcome! Enter information about the team lead");
  team.beginQuestions();
}

// Initiates program
init();
