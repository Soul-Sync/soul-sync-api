import { Router } from 'express';
import { index, show, store } from '../controllers/questionnaire.controller';
const router = Router();

router.get('/', index);
router.post('/', store);
router.get('/:id', show);

export default router;