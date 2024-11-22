import { Router } from 'express';
import { index } from '../controllers/question.model';
const router = Router();

router.get('/', index);

export default router;