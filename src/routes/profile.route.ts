import { Router } from 'express';
import { index, update } from '../controllers/profile.controller';
const router = Router();

router.get('/', index);
router.post('/', update);

export default router;