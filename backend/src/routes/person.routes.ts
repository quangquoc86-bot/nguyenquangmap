import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { 
  getPersons, 
  getPersonById, 
  createPerson, 
  updatePerson, 
  deletePerson,
  createRelationship
} from '../controllers/person.controller';

const router = Router();

router.use(authenticate);

router.get('/', getPersons);
router.get('/:id', getPersonById);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);
router.post('/relationship', createRelationship);

export default router;
