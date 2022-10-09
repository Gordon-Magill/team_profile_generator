const Employee = require("./Employee.js");

// Engineer gets additional github info
class Engineer extends Employee {
  constructor(name, id, email, gitName) {
    super(name, id, email);
    this.gitName = gitName;
    this.type = "Engineer";
  }

  getGit() {
    return this.gitName;
  }
}

module.exports = Engineer;
