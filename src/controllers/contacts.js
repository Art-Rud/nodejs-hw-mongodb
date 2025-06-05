import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { paginationParams } from '../utils/paginationParams.js';
import { sortParams } from '../utils/sortParams.js';
import { filterParams } from '../utils/filterParams.js';

export const getAllContactsCtrl = async (req, res) => {
  const { page, perPage } = paginationParams(req.query);
  const { sortBy, sortOrder } = sortParams(req.query);
  const filter = filterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;
  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }
  if (contact.userId.toString() !== req.user.id.toString()) {
    throw createHttpError.NotFound('Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const createContactCtrl = async (req, res) => {
  const contact = await createContact({ ...req.body, userId: req.user.id });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
export const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;
  const updatedContact = await updateContact(contactId, userId, req.body);
  if (!updatedContact) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};
export const deleteContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;
  const deletedContact = await deleteContact(contactId, userId);
  if (!deletedContact) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(204).end();
};
