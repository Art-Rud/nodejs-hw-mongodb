import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsCtrl = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdCtrl = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};
export const createContactCtrl = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
export const updateContactCtrl = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);
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
  const { id } = req.params;
  const deletedContact = await deleteContact(id);
  if (!deletedContact) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(204).end();
};
