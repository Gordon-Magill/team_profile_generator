const Team = require("../lib/Team");
const Manager = require("../lib/Manager");
const Intern = require("../lib/Intern");
const Engineer = require("../lib/Engineer");

const {
  getManagerInfo,
  chooseMenuOption,
  getEngineer,
  getIntern,
  menuCycle,
  generateHTML,
} = require("../src/helperFunctions");

const inquirer = require("inquirer");

jest.mock("inquirer");

describe("getManagerInfo", () => {
  test("Should return a Manager object", async () => {
    inquirer.prompt.mockReturnValue(
      new Promise(function (resolve) {
        resolve({
          name: "Test Manager Name",
          empID: "Test Manager ID",
          email: "Test Manager Email",
          officeNumber: "Test Manager Office",
        });
      })
    );
    let manager = await getManagerInfo();
    expect(manager).toBeInstanceOf(Manager);
  });
});

describe("chooseMenuOption", () => {
  test("Should return a string of a menu option", async () => {
    inquirer.prompt.mockReturnValue(
      new Promise(function (resolve) {
        resolve({
          selectedOption: "Add engineer",
        });
      })
    );

    let selectedOption = await chooseMenuOption();
    expect(selectedOption).toEqual("Add engineer");
  });
});

describe("getEngineer", () => {
  test("Should return an Engineer object", async () => {
    inquirer.prompt.mockReturnValue(
      new Promise(function (resolve) {
        resolve({
          name: "Test Engineer Name",
          empID: "Test Engineer ID",
          email: "Test Engineer Email",
          engineerGit: "Test Engineer GitHub",
        });
      })
    );
    let engineer = await getEngineer();
    expect(engineer).toBeInstanceOf(Engineer);
  });
});

describe("getIntern", () => {
  test("Should return an Intern object", async () => {
    inquirer.prompt.mockReturnValue(
      new Promise(function (resolve) {
        resolve({
          name: "Test Intern Name",
          empID: "Test Intern ID",
          email: "Test Intern Email",
          internSchool: "Test Intern School",
        });
      })
    );

    let intern = await getIntern();
    expect(intern).toBeInstanceOf(Intern);
  });
});

describe("menuCycle", () => {
  test('Should add an engineer and call itself if "Add engineer" is chosen', async () => {
    let team = new Team();
    const mock = jest.spyOn(console, "log");

    inquirer.prompt
      // First call emulates usage in chooseMenuOption
      .mockReturnValueOnce(
        new Promise(function (resolve) {
          resolve({
            selectedOption: "Add engineer",
          });
        })
      )
      // Second call emulates usage in getEngineer
      .mockReturnValueOnce(
        new Promise(function (resolve) {
          resolve({
            name: "Test Engineer Name",
            empID: "Test Engineer ID",
            email: "Test Engineer Email",
            engineerGit: "Test Engineer GitHub",
          });
        })
      )
      // Third call emulates usage in chooseMenuOption in order to exit the loop
      .mockReturnValueOnce(
        new Promise(function (resolve) {
          resolve({
            selectedOption: "Exit",
          });
        })
      );

    await menuCycle(team);

    expect(mock).toHaveBeenCalledWith(
      `\nAdded engineer, going back to the menu\n`
    );

    // Technically this also shows that menuCycle calls itself since in order to resolve
    // the test it gets called twice, once resuling in the engineer call and the second
    // leading to the exit condition.
    expect(mock).toHaveBeenCalledWith(
      `Done getting team info, generating HTML...`
    );
  });

  test('Should add an intern and call itself if "Add intern" is chosen', async () => {
    let team = new Team();
    const mock = jest.spyOn(console, "log");

    inquirer.prompt
      // First call emulates usage in chooseMenuOption
      .mockReturnValueOnce(
        new Promise(function (resolve) {
          resolve({
            selectedOption: "Add intern",
          });
        })
      )
      // Second call emulates usage in getEngineer
      .mockReturnValueOnce(
        new Promise(function (resolve) {
          resolve({
            name: "Test Intern Name",
            empID: "Test Intern ID",
            email: "Test Intern Email",
            internSchool: "Test Intern GitHub",
          });
        })
      )
      // Third call emulates usage in chooseMenuOption in order to exit the loop
      .mockReturnValueOnce(
        new Promise(function (resolve) {
          resolve({
            selectedOption: "Exit",
          });
        })
      );

    await menuCycle(team);

    expect(mock).toHaveBeenCalledWith(
      `\nAdded intern, going back to the menu\n`
    );

    // Technically this also shows that menuCycle calls itself since in order to resolve
    // the test it gets called twice, once resuling in the engineer call and the second
    // leading to the exit condition.
    expect(mock).toHaveBeenCalledWith(
      `Done getting team info, generating HTML...`
    );
  });

  test('Should exit out if "Exit" is chosen', async () => {
    const team = new Team();

    const mock = jest.spyOn(console, "log");

    inquirer.prompt.mockReturnValue(
      new Promise(function (resolve) {
        resolve({
          selectedOption: "Exit",
        });
      })
    );

    await menuCycle(team);

    expect(mock).toBeCalledWith(`Done getting team info, generating HTML...`);
  });
});

describe("generateHTML", () => {
  test("Should return a string that at least has manager information encoded", () => {
    let team = new Team();
    team.setManager(new Manager("a", "b", "c", "d"));
    htmlContent = generateHTML(team);
    expect(htmlContent).toEqual(expect.stringContaining("<!-- Manager -->"));
  });

  test("Should return a string that has employee information if members are in the roster", () => {
    let team = new Team();
    team.setManager(new Manager("a", "b", "c", "d"));
    team.addMember(new Engineer("a", "b", "c", "d"));
    team.addMember(new Intern("a", "b", "c", "d"));
    htmlContent = generateHTML(team);
    expect(htmlContent).toEqual(expect.stringContaining("<!-- Engineer -->"));
    expect(htmlContent).toEqual(expect.stringContaining("<!-- Intern -->"));
  });
});
