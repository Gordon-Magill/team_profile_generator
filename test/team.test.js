const Team = require("../lib/Team");
const {getManagerInfo,
  chooseMenuOption,
  getEngineer,
  getIntern,
  menuCycle,
  generateHTML} = require('../src/helperFunctions')

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

  describe('', () => {})

});
