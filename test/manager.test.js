const Manager = require('../lib/Manager')

describe("Manager", () => {
    describe('Initialization', () => {
        it('Should inherit from Manager', () => {
            let obj = new Manager("Manager's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj instanceof Manager).toEqual(true);
        })

        it('Should initialize with correct properties', () => {
            obj = new Manager("Manager's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj.getName()).toEqual("Manager's name")
            expect(obj.getID()).toEqual("id#123456")
            expect(obj.getEmail()).toEqual('tests@email.com')
            expect(obj.getRole()).toEqual('Manager')
        })
    })
})