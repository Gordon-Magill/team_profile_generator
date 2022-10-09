const Employee = require("./Employee.js");

// Intern gets additional email and school info
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.type = "Intern";
  }

  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
