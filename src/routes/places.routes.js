import { Router } from 'express';
import * as controller from '../controllers/places.controller.js';
import { validate } from '../middlewares/validate.js';
import { placeSchema, placeUpdateSchema, listQuerySchema } from '../validators/place.validator.js';

const router = Router();

router.get('/', validate(listQuerySchema, 'query'), controller.list);
router.get('/:id', controller.getOne);
router.post('/', validate(placeSchema), controller.create);
router.patch('/:id', validate(placeUpdateSchema), controller.update);
router.delete('/:id', controller.remove);

export default router;
