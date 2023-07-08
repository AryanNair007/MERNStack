import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
    

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);


import { protect } from '../middleware/authMiddleware.js';
router.get('/me', protect, getMe);


export default router;