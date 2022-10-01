const inquirer = require('inquirer');

const memberQuestions = [
    // Name, employee ID, github username
    {
        type:'input',
        messsage:'Team member name:',
        name:'memberName'
    },
    {
        type:'input',
        messsage:'Team member employee ID:',
        name:'memberID'
    },
    {
        type:'input',
        messsage:'Team member github username:',
        name:'memberGitName'
    },
];

const managerQuestions = [
    // Name, employee ID, email, office number
    {
        type:'input',
        messsage:'Team lead name:',
        name:'leadName'
    },
    {
        type:'input',
        messsage:'Team lead employee ID:',
        name:'leadEmpID'
    },
    {
        type:'input',
        messsage:'Team lead email:',
        name:'leadEmail'
    },
    {
        type:'input',
        messsage:'Team lead office:',
        name:'leadOffice'
    }
];

const internQuestions = [
    // Name, employee ID, email, school
    {
        type:'input',
        messsage:'Intern name:',
        name:'internName'
    },
    {
        type:'input',
        messsage:'Intern employee ID:',
        name:'internID'
    },
    {
        type:'input',
        messsage:'Intern email:',
        name:'internEmail'
    },
    {
        type:'input',
        messsage:'Intern school:',
        name:'internSchool'
    },

];

const menuQuestions = [
    {
        type: 'list',
        message: 'Select option:',
        choices: ['Add engineer', 'Add intern', 'Exit'],
        name: 'selectedOption'
    },
];


// Object to represent a single team member
function TeamMember(name,empID,gitName) {
    this.name = name;
    this.empID = empID;
    this.gitName = gitName;
    return;
}

// Object to represent a team lead
function TeamLead(name,empID,email,office) {
    this.name = name;
    this.empID = empID;
    this.email = email;
    this.office = office;
    return;
};

// Object to represent an intern
function Intern(name,empID,email,school) {
    this.name = name;
    this.empID = empID;
    this.email = email;
    this.school = school;
    return;
}

// Team is composed of a team lead and optional members
function Team(teamLead,...members) {
    this.teamLead = teamLead;
    this.members = [...members];
}

// Adding a team member simply mutates the list
Team.prototype.addMember = (member) => {
    this.members.push(member);
}

// Generates page HTML
function generateHTML() {
    return;
}

// Return a promise for a team lead
function getTeamLead() {
    const teamLead = inquirer.prompt(managerQuestions).then((answers) => {
        const {leadName, leadEmpId, leadEmail, leadOffice} = answers;
        const lead = new TeamLead(leadName,leadEmpId,leadEmail,leadOffice);
        return lead;
    });
    return teamLead;
}

// Return a promise for a team member
function getTeamMember() {
    const teamMember = inquirer.prompt(memberQuestions).then((answers) => {
        const {memberName, memberID, memberGitName} = answers;
        const member = new TeamMember(memberName,memberID,memberGitName);
        return member;
    });
    return teamMember
}

Team.prototype.selectOption = () => {

    teamMember = getTeamMember()
}

// Function to initialize the program
function init() {

    // Get the team lead
    teamLead = getTeamLead()
    team = new Team(teamLead);
    team.selectOption()
    
    // Get the rest of the team
    

    return;
}

// Initialize the program
init();