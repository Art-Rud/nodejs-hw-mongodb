import { Contacts } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contacts.find();
  console.log(contacts);

  return contacts;
};
export const getContactById = async (id) => {
  const contact = await Contacts.findById(id);
  return contact;
};
export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};
export const updateContact = async (id, payload) => {
  const updatedContact = await Contacts.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedContact;
};
export const deleteContact = async (id) => {
  const deletedContact = await Contacts.findByIdAndDelete(id);
  return deletedContact;
};
