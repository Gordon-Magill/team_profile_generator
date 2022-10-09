const Intern = require('../lib/Intern')

describe("Intern", () => {
    describe('Initialization', () => {
        it('Should inherit from Intern', () => {
            let obj = new Intern("Intern's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj instanceof Intern).toEqual(true);
        })

        it('Should initialize with correct properties', () => {
            obj = new Intern("Intern's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj.getName()).toEqual("Intern's name")
            expect(obj.getID()).toEqual("id#123456")
            expect(obj.getEmail()).toEqual('tests@email.com')
            expect(obj.getRole()).toEqual('Intern')
        })
    })
})