import { Router } from 'express';
import { userAuth } from '../middlewares/auth.js';


const router = Router();

router.use(userAuth)
router.get('/', (req, res) => {
  res.json({ mensaje: 'Hola desde product con metodo GET' });
});

router.get('/food', (req, res) => {
  res.json({ mensaje: 'Hola desde product con metodo GET food',
    foods:[ 'pizza', 'tacos', 'burritos', 'sushi', 'pasta' ]
   });
});

router.get('/juice', (req, res) => {
  res.json({ mensaje: 'Hola desde product con metodo GET juice',
    juices:[ 'tomate', 'limon', 'mango', 'kiwi', 'coco' ]
   });
});


export default router;