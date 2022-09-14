const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const { contactService } = require('../services');

const createContact = async (req, res, next) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(httpStatus.CREATED).send(contact);
  } catch (e) {
    next(e);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const filter = pick(req.query, ['firstName', 'lastName', 'address', 'homeTel', 'workTel', 'mobileTel']);
    const result = await contactService.queryContacts(filter);
    res.send(result);
  } catch (e) {
    next(e);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.contactId);
    if (!contact) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    res.send(contact);
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await contactService.deleteContactById(req.params.contactId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
};
