const { faker } = require('@faker-js/faker');
const { Contact } = require('../../../src/models');

describe('Contact model', () => {
  describe('Contact validation', () => {
    let newContact;
    beforeEach(() => {
      newContact = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        homeTel: parseInt(faker.phone.number('##########'), 10),
      };
    });

    test('should correctly validate a valid contact', async () => {
      await expect(new Contact(newContact).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if telephone is invalid', async () => {
      newContact.homeTel = '604-235-4854';
      await expect(new Contact(newContact).validate()).rejects.toThrow();
    });
  });
});
