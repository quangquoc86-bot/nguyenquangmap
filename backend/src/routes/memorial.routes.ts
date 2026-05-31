import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { 
  getMemorialEvents, 
  createMemorialEvent, 
  updateMemorialEvent, 
  deleteMemorialEvent
} from '../controllers/memorial.controller';

const router = Router();

router.use(authenticate);

router.get('/', getMemorialEvents);
router.post('/', createMemorialEvent);
router.put('/:id', updateMemorialEvent);
router.delete('/:id', deleteMemorialEvent);

export default router;
