const Team = require("../lib/Team");
const Manager = require("../lib/Manager");
const Intern = require("../lib/Intern");
const Engineer = require("../lib/Engineer");

const {getManagerInfo,
  chooseMenuOption,
  getEngineer,
  getIntern,
  menuCycle,
  generateHTML} = require('../src/helperFunctions');

const inquirer = require('inquirer')

jest.mock('inquirer')


describe('getManagerInfo',() => {
    test('Should return a Manager object', async () => {
        inquirer.prompt.mockReturnValue(
            new Promise(function(resolve) {
                resolve({
                    name: 'Test Manager Name',
                    empID: 'Test Manager ID',
                    email: 'Test Manager Email',
                    officeNumber: 'Test Manager Office'
                });
              })
        );
        let manager = await getManagerInfo()
        expect(manager).toBeInstanceOf(Manager);
    });
})

describe('chooseMenuOption',() => {
    test('Should return a string of a menu option',async () => {

        inquirer.prompt.mockReturnValue(
            new Promise(function(resolve) {
                resolve({
                    selectedOption: 'Add engineer',
                });
              })
        );

        let selectedOption = await chooseMenuOption()
        expect(selectedOption).toEqual('Add engineer')
    });
})

describe('getEngineer',() => {
    test('Should return an Engineer object', async () => {
        inquirer.prompt.mockReturnValue(
            new Promise(function(resolve) {
                resolve({
                    name: 'Test Engineer Name',
                    empID: 'Test Engineer ID',
                    email: 'Test Engineer Email',
                    engineerGit: 'Test Engineer GitHub'
                });
              })
        );
        let engineer = await getEngineer()
        expect(engineer).toBeInstanceOf(Engineer)
    });
})

describe('getIntern',() => {
    test('Should return an Intern object', async () => {
        inquirer.prompt.mockReturnValue(
            new Promise(function(resolve) {
                resolve({
                    name: 'Test Intern Name',
                    empID: 'Test Intern ID',
                    email: 'Test Intern Email',
                    internSchool: 'Test Intern School'
                });
              })
        );

        let intern = await getIntern()
        expect(intern).toBeInstanceOf(Intern)

    });
})

describe('menuCycle',() => {
    test('Should add and engineer and call itself if "Add engineer" is chosen', async () => {
        // let team = new Team();

        // jest.mock('chooseMenuOption')
        // chooseMenuOption.mockReturnValue(new Promise(function(resolve) {
        //     resolve('Add engineer');
        //   }));

        // jest.mock('getEngineer')
        // getEngineer.mockReturnValue(new Promise(function(resolve) {
        //     resolve(new Engineer('name', 'empID', 'email', 'engineerGit'));
        //   }));

        // await menuCycle(team)

        // console.log(JSON.stringify(team))
        // expect(team.getTeamRoster().length).toEqual(1)

    });

    test('Should call itself if "Add intern" is chosen',() => {

    });

    test('Should exit out if "Exit" is chosen',() => {

    });

})

describe('generateHTML',() => {
    test('',() => {

    });
})