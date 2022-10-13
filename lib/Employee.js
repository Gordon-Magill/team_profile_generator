// Generic class of employee for common parameters
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = 'Employee';
  }

  // Not currently used, but good to have for completeness
  // Maybe an intern gets promoted in the future?
  setRole(role) {
    this.role = role;
  }

  getRole() {
    return this.role;
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
