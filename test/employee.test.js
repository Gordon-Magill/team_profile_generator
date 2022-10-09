const Employee = require('../lib/Employee')

describe("Employee", () => {
    describe('Initialization', () => {
        it('Should inherit from Employee', () => {
            let obj = new Employee("Employee's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj instanceof Employee).toEqual(true);
        })

        it('Should initialize with correct properties', () => {
            obj = new Employee("Employee's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj.getName()).toEqual("Employee's name")
            expect(obj.getID()).toEqual("id#123456")
            expect(obj.getEmail()).toEqual('tests@email.com')
            expect(obj.getRole()).toEqual('Employee')
        })
    })
})