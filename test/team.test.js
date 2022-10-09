const Team = require("../lib/Team");
const inquirer = require('inquirer')
// const fs = require("fs");


jest.mock("inquirer");

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

//   describe("beginQuestions", () => {
//     it("Should trigger inquirer prompt", () => {
//         obj = new Team()

//       const mock = jest.spyOn(obj, "log");
//       mock.mockImplementation(() => {});

//       log.black(message);

//       expect(mock).toBeCalledWith(colors.black, message);

//       mock.mockRestore();
//     });
//   });
});
