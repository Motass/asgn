const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Contact } = require('../../src/models');

setupTestDB();

describe('Contact routes', () => {
  describe('POST /v1/contacts', () => {
    let newContact;

    beforeEach(() => {
      newContact = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        homeTel: parseInt(faker.phone.number('##########'), 10),
      };
    });

    test('should return 201 and successfully create new contact if data is ok', async () => {
      const res = await request(app).post('/v1/contacts').send(newContact).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        address: newContact.address,
        homeTel: newContact.homeTel,
      });

      const dbContact = await Contact.findById(res.body.id);
      expect(dbContact).toBeDefined();
      expect(dbContact).toMatchObject({
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        address: newContact.address,
        homeTel: newContact.homeTel,
      });
    });
  });
});
