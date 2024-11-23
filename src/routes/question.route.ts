import { Router } from 'express';
import { index } from '../controllers/question.controller';
const router = Router();

router.get('/', index);

export default router;