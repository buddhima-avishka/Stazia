import express from 'express'
import { roomList } from '../controllers/hotelController.js'

const roomRouter = express.Router()

roomRouter.get('/list', roomList)

export default roomRouter;

