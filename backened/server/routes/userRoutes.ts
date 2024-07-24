import auth from "../middleware/authMiddleware";
import userController from "../controllers/userControllers";
import { Router, Request, Response } from "express";
import postController from "../controllers/postController";
import multerConfig from '../config/multer'
import followController from "../controllers/followController";
import messageController from "../controllers/messageController";
const router: Router = Router()

const upload = multerConfig.array('image')

router.get('/getAlluser', userController.Register)
router.post('/signpost', userController.postRegister)
router.post('/login', userController.postLogin)
router.get('/', auth, userController.getUser)
router.post('/google/login', userController.googleLogin)
router.post('/google', userController.GoogleSignup)
router.patch('/editusername', auth, userController.editUsername)
router.patch('/profilephoto', auth, upload, userController.editProfile)

router.post('/forget-password', userController.ForgotPassword)
router.get('/password-reset/:username/:newToken', userController.SetPassword)
router.post('/password-reset', userController.NewPassword)


router.post('/newPost', auth, upload, postController.createPost)
router.get('/getPost', auth, postController.getPOst)
router.delete('/deletePost/:postId', postController.DeletePOst)
router.post('/report', postController.Report)
router.get('/getPost/:id', auth, postController.getsinglePOst)
router.get('/userPost/:id', auth, userController.userPost)
router.patch('/liked', postController.LikePost)
router.post('/postComment', auth, postController.CommentPost)
router.get('/getComments/:id', auth, postController.getComment)
router.patch('/save', auth, postController.SavePost)
router.get('/savedPost/:userId', auth, postController.SavedPost)
router.get('/friendProfile/:username', auth, userController.FriendProfile)
router.get('/friendPost/:username', auth, postController.FriendPost)
router.post('/follow', auth, followController.Follow)
router.post('/unfollow', auth, followController.Unfollow)
router.get('/follow', auth, followController.getFollow)
router.get('/userFollower', auth, followController.GetuserFollow)
router.get('/notification/:id', postController.getNotification)
router.delete('/clearAll/:id', postController.ClearAllNotification)
router.get('/userFollowerlist/:id', followController.getFollower)
router.get('/userFollowinglist/:id', followController.getFollowing)
//create message

router.post('/msg', messageController.PostMessage)
router.get('/get/chat/msg/:senderId/:recievedId', messageController.GetMEssage)

router.post('/getAllChatsOfuser',messageController.getAllChats)

router.get('/chatUSer/:userId', messageController.getChatUser)
export default router

