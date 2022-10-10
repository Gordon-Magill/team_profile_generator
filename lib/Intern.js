const Employee = require("./Employee.js");

// Intern gets additional school info on top of normal Employee info
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.role = "Intern";
  }

  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
