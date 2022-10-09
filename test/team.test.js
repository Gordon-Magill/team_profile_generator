const Team = require('../lib/Team')

describe("Team", () => {
    describe('Initialization', () => {
        it('Should inherit from Team', () => {
            let obj = new Team();
            expect(obj instanceof Team).toEqual(true);
        })

        it('Should initialize with correct properties', () => {
            obj = new Team("Employee's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj.getName()).toEqual("Employee's name")
            expect(obj.getID()).toEqual("id#123456")
            expect(obj.getEmail()).toEqual('tests@email.com')
            expect(obj.getRole()).toEqual('Employee')
        })
    })
})