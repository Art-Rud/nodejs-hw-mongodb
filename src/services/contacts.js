import { Contacts } from '../models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactQuery = Contacts.find();
  if (typeof filter.contactType !== 'undefined') {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const [totalItems, contacts] = await Promise.all([
    Contacts.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  console.log(contacts);
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
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
