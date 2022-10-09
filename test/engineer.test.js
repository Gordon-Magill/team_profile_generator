const Engineer = require('../lib/Engineer')

describe("Engineer", () => {
    describe('Initialization', () => {
        it('Should inherit from Engineer', () => {
            let obj = new Engineer("Engineer's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj instanceof Engineer).toEqual(true);
        })

        it('Should initialize with correct properties', () => {
            obj = new Engineer("Engineer's name", "id#123456", 'tests@email.com', 'test-gitName');
            expect(obj.getName()).toEqual("Engineer's name")
            expect(obj.getID()).toEqual("id#123456")
            expect(obj.getEmail()).toEqual('tests@email.com')
            expect(obj.getGitHub()).toEqual('test-gitName')
            expect(obj.getRole()).toEqual('Engineer')
        })
    })
})