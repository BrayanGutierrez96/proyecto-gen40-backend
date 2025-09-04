import { Router } from 'express';
import { getUsers,createUser,loginUser, logoutUser } from '../controllers/users.controllers.js';
import { userAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.use(userAuth)
router.get('/', getUsers);




export default router;