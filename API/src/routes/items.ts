import { Router } from 'express';
import ItemsController from '../controller/ItemController';
import { checkJwt } from '../middlewares/jwt';


const router = Router();

// Get all items
router.get('/', ItemsController.getAll);

// Get one item
router.get('/:id', ItemsController.getById);

// Create a new item
router.post('/', ItemsController.newItem);

// Edit item
router.patch('/:id', ItemsController.editItem);

// Delete
router.delete('/:id', ItemsController.deleteItem);

export default router;