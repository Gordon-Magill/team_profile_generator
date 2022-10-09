
const Team = require("./lib/Team");

// Orchestrates control flow for program
function init() {
  const newTeam = new Team();
  console.log("Welcome! Enter information about the team lead");
  newTeam.beginQuestions();
}

// Initiates program
init();
