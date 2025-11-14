import express from 'express';
import { addHotel, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-hotel', authAdmin ,upload.single('image'), addHotel);
adminRouter.post('/login', loginAdmin);

export default adminRouter;