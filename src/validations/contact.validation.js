const Joi = require('joi');

const createContact = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    homeTel: Joi.number().required(),
    mobileTel: Joi.number(),
    workTel: Joi.number(),
  }),
};

const getContacts = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    address: Joi.string(),
    homeTel: Joi.number(),
    mobileTel: Joi.number(),
    workTel: Joi.number(),
  }),
};

const getContact = {
  params: Joi.object().keys({
    contactId: Joi.string().required(),
  }),
};

const deleteContact = {
  params: Joi.object().keys({
    contactId: Joi.string().required(),
  }),
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
};
