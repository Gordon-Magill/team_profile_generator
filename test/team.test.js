const Engineer = require("../lib/Engineer");
const Manager = require("../lib/manager");
const Team = require("../lib/Team");
const {
  getManagerInfo,
  chooseMenuOption,
  getEngineer,
  getIntern,
  menuCycle,
  generateHTML,
} = require("../src/helperFunctions");

describe("Team", () => {
  describe("Initialization", () => {
    test("Should inherit from Team", () => {
      let obj = new Team();
      expect(obj instanceof Team).toEqual(true);
    });

    test("Should initialize with correct properties", () => {
      obj = new Team();
      expect(obj.getManager()).toEqual(null);
      expect(obj.getTeamRoster()).toEqual([]);
    });
  });

  describe("Getters and setters", () => {
    test("setManager sets a new Manager", async () => {
      let team = new Team();
      let manager = new Manager("a", "b", "c", "d");
      team.setManager(manager);
      expect(team.manager).toBe(manager);
    });

    test("getManager returns a Manager", async () => {
      let team = new Team();
      let manager = new Manager("a", "b", "c", "d");
      team.setManager(manager);
      expect(team.getManager()).toBe(manager);
    });

    test("addMember stores a new member in the roster", async () => {
      let team = new Team();
      let engineer = new Engineer("a", "b", "c", "d");
      team.addMember(engineer);

      expect(team.teamRoster.length).toEqual(1);
    });

    test("getTeamRoster returns an array of employees", async () => {
      let team = new Team();
      let engineer = new Engineer("a", "b", "c", "d");
      team.addMember(engineer);
      let roster = team.getTeamRoster();

      expect(roster).toContain(engineer);
    });
  });
});
