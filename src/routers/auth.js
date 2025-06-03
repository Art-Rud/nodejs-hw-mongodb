import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import {
  loginCtrl,
  logoutCtrl,
  refreshCtrl,
  registerCtrl,
} from '../controllers/auth.js';
const router = express.Router();
router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerCtrl),
);
router.post('/login', validateBody(loginSchema), ctrlWrapper(loginCtrl));
router.post('/refresh', ctrlWrapper(refreshCtrl));
router.post('/logout', ctrlWrapper(logoutCtrl));
export default router;
