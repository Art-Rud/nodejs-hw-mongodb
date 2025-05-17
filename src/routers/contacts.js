import express from 'express';

import {
  createContactCtrl,
  deleteContactCtrl,
  getAllContactsCtrl,
  getContactByIdCtrl,
  updateContactCtrl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = express.Router();
router.get('/contacts', ctrlWrapper(getAllContactsCtrl));
router.get('/contacts/:id', ctrlWrapper(getContactByIdCtrl));
router.post('/contacts', ctrlWrapper(createContactCtrl));
router.patch('/contacts/:id', ctrlWrapper(updateContactCtrl));
router.delete('/contacts/:id', ctrlWrapper(deleteContactCtrl));
export default router;
