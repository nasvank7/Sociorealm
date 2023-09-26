import auth from "../middleware/authMiddleware";
import adminController from '../controllers/adminControllers'
import { Router,Request,Response } from "express";

const router:Router=Router()

router.post('/admin',adminController.adminLogin)
router.get('/user',adminController.getUSer)
router.put('/userBlock',adminController.BlockUser)
router.get('/allPost',adminController.getPost)
router.delete('/delete/:id',adminController.deletePost)
router.get('/report',adminController.GetReport)

export default router