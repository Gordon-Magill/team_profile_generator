// The main object to handle team composition
class Team {
  // Initializes to empty default values
  constructor() {
    this.manager = null;
    this.teamRoster = [];
  }

  setManager(manager) {
    this.manager = manager;
  }

  getManager() {
    return this.manager;
  }

  addMember(employee) {
    this.teamRoster.push(employee);
  }

  getTeamRoster() {
    return this.teamRoster;
  }

}

module.exports = Team;
