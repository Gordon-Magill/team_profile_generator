const Employee = require("./Employee.js");

// TeamLead gets additional email and office number
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = "Manager";
  }

  getOffice() {
    return this.officeNumber;
  }
}

module.exports = Manager;
