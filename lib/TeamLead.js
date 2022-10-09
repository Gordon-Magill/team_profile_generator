const Employee = require("./Employee.js");

// TeamLead gets additional email and office number
class TeamLead extends Employee {
  constructor(name, id, email, office) {
    super(name, id, email);
    this.office = office;
    this.type = "Team Lead";
  }

  getOffice() {
    return this.office;
  }
}

module.exports = TeamLead;
