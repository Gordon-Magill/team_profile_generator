const Employee = require("./Employee");
const Manager = require("./manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const inquirer = require("inquirer");
const fs = require("fs");

// The main object to handle team composition
class Team {
  constructor() {
    this.manager = null;
    this.teamRoster = [];
  }

  setManager(manager) {
    this.manager = manager;
  }

  addMember(employee) {
    this.teamRoster.push(employee);
  }

  getManager() {
    return this.manager;
  }

  getTeamRoster() {
    return this.teamRoster;
  }

}

module.exports = Team;
