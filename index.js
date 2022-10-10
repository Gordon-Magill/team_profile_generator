const Team = require("./lib/Team.js");
const {
  getManagerInfo,
  menuCycle,
  generateHTML,
} = require("./src/helperFunctions.js");
const fs = require('fs');

// Orchestrates control flow for program
async function init() {
  // Create an empty team
  const team = new Team();

  // Prompt the user for the manager information
  console.log("Welcome! Enter information about the team lead");
  let manager = await getManagerInfo();
  team.setManager(manager);

  console.log(`\nAdded manager, going back to the menu\n`);

  // Cycle through options to add members until the user selects 'Exit'
  await menuCycle(team);



  // Generate HTML content based on the final team composition
  htmlContent = generateHTML(team);

  // Write the team HTML content to the final file
  let filePath = './dist/index.html'
  fs.writeFile(filePath,htmlContent,(err) => {
    err 
      ? console.log(err)
      : console.log(`HTML content written to ${filePath}`)
  });
  console.log('Done.')
};

// Initiates program
init();
