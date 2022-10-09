const {
  Team,
  managerQuestions,
  engineerQuestions,
  internQuestions,
  menuQuestions,
} = require("../lib/Team");
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

jest.mock("inquirer");
jest.mock("fs");

describe("Team", () => {
  describe("Initialization", () => {
    it("Should inherit from Team", () => {
      let obj = new Team();
      expect(obj instanceof Team).toEqual(true);
    });

    it("Should initialize with correct properties", () => {
      obj = new Team();
      expect(obj.getManager()).toEqual(null);
      expect(obj.getTeamRoster()).toEqual([]);
    });
  });

  describe("beginQuestions", () => {
    it("Should trigger inquirer prompt to get manager information", () => {
      obj = new Team();
      inquirer.prompt.mockReturnValue(
        new Promise(function (resolve) {
          resolve({
            name: "Test Name",
            empID: "Test empId",
            email: "Test email",
            officeNumber: "Test officeNumber",
          });
        })
      );
      obj.beginQuestions();

      expect(inquirer.prompt).toHaveBeenLastCalledWith(managerQuestions);
    });

    //     it("Should trigger a menu call after getting the manager information", () => {
    //         obj = new Team()
    //         const mock = jest.spyOn(obj, "chooseOption");

    //         mock.mockImplementation(() => {});
    //         obj.beginQuestions();

    //         expect(mock).toHaveBeenCalled()
    //     });
  });

  describe("addEmployee", () => {
    it("Should add engineers", () => {
      const team = new Team();

      inquirer.prompt.mockReturnValue(
        new Promise(function (resolve) {
          resolve({
            name: "Test Name",
            empID: "Test empId",
            email: "Test email",
            gitName: "Test gitName",
          });
        })
      );

      const newEngineer = team.addEmployee("Engineer");
      expect(inquirer.prompt).toHaveBeenLastCalledWith(engineerQuestions);
      expect(newEngineer).resolves.toBeInstanceOf(Engineer);
    });

    it("Should add interns", () => {
      const team = new Team();

      inquirer.prompt.mockReturnValue(
        new Promise(function (resolve) {
          resolve({
            name: "Test Name",
            empID: "Test empId",
            email: "Test email",
            internSchool: "Test gitName",
          });
        })
      );

      const newIntern = team.addEmployee("Intern");
      expect(inquirer.prompt).toHaveBeenLastCalledWith(internQuestions);
      expect(newIntern).resolves.toBeInstanceOf(Intern);
    });
  });

  describe("chooseOption", () => {
    it("Should trigger inquirer with menu questions", () => {
      const team = new Team();

      // const mock = jest.spyOn(team, "addEmployee");
      // mock.mockImplementation(() => {});

      inquirer.prompt.mockReturnValue(
        new Promise(function (resolve) {
          resolve({
            selectedOption: "Add Engineer",
          });
        })
      );

      team.chooseOption();
      expect(inquirer.prompt).toHaveBeenLastCalledWith(menuQuestions);
      // expect(mock).toHaveBeenCalled()
    });
  });

//   describe("generateHTML", () => {
//     it("Should write HTML to file", () => {
//       const team = new Team();
//       team.setManager(
//         new Manager("Test Name", "Test ID", "Test Email", "Test Office")
//       );
//       team.generateHTML();

//       fs.writeFile.mockReturnValue(0);

//       expect(fs.writeFile).toHaveBeenCalled();
//     });
//   });
});
