// Generic class of employee for common parameters
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.type = null;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getID() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }
}

module.exports = Employee;
