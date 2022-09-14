const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    homeTel: {
      type: Number,
      required: true,
      trim: true,
    },
    mobileTel: {
      type: Number,
      required: false,
      trim: true,
    },
    workTel: {
      type: Number,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);

/**
 * Check if home telephone is taken
 * @param {string} homeTel - The contact's home telephone
 * @param {ObjectId} [excludeContactId] - The id of the contact to be excluded
 * @returns {Promise<boolean>}
 */
contactSchema.statics.isTelephoneTaken = async function (homeTel, excludeContactId) {
  const contact = await this.findOne({ homeTel, _id: { $ne: excludeContactId } });
  return !!contact;
};

/**
 * @typedef Contact
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
