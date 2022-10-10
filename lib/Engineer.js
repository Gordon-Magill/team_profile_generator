const Employee = require("./Employee.js");

// Engineer gets additional github info on top of normal Employee info
class Engineer extends Employee {
  constructor(name, id, email, gitName) {
    super(name, id, email);
    this.gitName = gitName;
    this.role = "Engineer";
  }

  getGitHub() {
    return this.gitName;
  }
}

module.exports = Engineer;
