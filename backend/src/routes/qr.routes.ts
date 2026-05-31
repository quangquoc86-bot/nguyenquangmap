import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { 
  getQRCodeByGraveId, 
  generateQRCode 
} from '../controllers/qr.controller';

const router = Router();

router.use(authenticate);

router.get('/grave/:graveId', getQRCodeByGraveId);
router.post('/generate', generateQRCode);

export default router;
