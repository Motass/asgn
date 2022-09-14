const httpStatus = require('http-status');
const { Contact } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a contact
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const createContact = async (contactBody) => {
  if (await Contact.isTelephoneTaken(contactBody.homeTel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Telephone already taken');
  }
  return Contact.create(contactBody);
};

/**
 * Query for contacts
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryContacts = async (filter) => {
  const contacts = await Contact.find(filter);
  return contacts;
};

/**
 * Get contact by id
 * @param {string} contactId
 * @returns {Promise<Contact>}
 */
const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

/**
 * Delete contact by id
 * @param {ObjectId} contactId
 * @returns {Promise<Contact>}
 */
const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  await contact.remove();
  return contact;
};

module.exports = {
  createContact,
  queryContacts,
  getContactById,
  deleteContactById,
};
