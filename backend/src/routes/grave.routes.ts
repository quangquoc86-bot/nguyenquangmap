import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { 
  getGraves, 
  getGraveById, 
  createGrave, 
  updateGrave, 
  deleteGrave,
  addGravePhoto
} from '../controllers/grave.controller';

const router = Router();

router.use(authenticate);

router.get('/', getGraves);
router.get('/:id', getGraveById);
router.post('/', createGrave);
router.put('/:id', updateGrave);
router.delete('/:id', deleteGrave);
router.post('/:id/photos', addGravePhoto);

export default router;
