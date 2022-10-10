const { Team } = require("./lib/Team.js");
const {
  getManagerInfo,
  chooseMenuOption,
  getEngineer,
  getIntern,
  menuCycle,
  generateHTML,
} = require("./src/helperFunctions.js");
const fs = require('fs')

// Orchestrates control flow for program
async function init() {
  // Create an empty team
  const team = new Team();

  // Prompt the user for the manager information
  console.log("Welcome! Enter information about the team lead");
  let manager = await getManagerInfo()
  team.setManager(manager)

  // Confirm manager info (verbose)
  // console.log(`\nAdded manager:
  // ${JSON.stringify(team.getManager())}
  // ...going back to the menu\n`)

  // Confirm manager info (slim)
  console.log(`\nAdded manager, going back to the menu\n`)

  // Cycle through options to add members until the user selects 'Exit'
  await menuCycle(team)

  console.log(`Done getting team info, generating HTML...`)

  htmlContent = generateHTML(team);

  let filePath = './dist/index.html'
  fs.writeFile(filePath,htmlContent,(err) => {
    err 
      ? console.log(err)
      : console.log(`HTML content written to ${filePath}`)
  })





}

// Initiates program
init();
