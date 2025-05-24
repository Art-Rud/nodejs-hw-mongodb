import express from 'express';

import {
  createContactCtrl,
  deleteContactCtrl,
  getAllContactsCtrl,
  getContactByIdCtrl,
  updateContactCtrl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, contactUpdateSchema } from '../validation/contact.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
router.get('/contacts', ctrlWrapper(getAllContactsCtrl));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdCtrl));
router.post(
  '/contacts',
  validateBody(contactSchema),
  ctrlWrapper(createContactCtrl),
);
router.patch(
  '/contacts/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(updateContactCtrl),
);
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactCtrl));
export default router;
