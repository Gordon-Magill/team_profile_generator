const Employee = require("./Employee.js");

// Manager gets additional office number on top of normal Employee info
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
