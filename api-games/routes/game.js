import express from 'express';
import GameController from '../controllers/game.controller.js';

const router = express.Router();

router.get('/games', GameController.getAll);
router.get('/games/:id', GameController.getOneGame);

router.post('/games', GameController.createGame);

router.put('/games/:id', GameController.updateGame);

router.delete('/games/:id', GameController.deleteGame);

export default router;