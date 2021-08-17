import { Router } from 'express';
import ReportController from '../controller/ReportController';
import { checkJwt } from '../middlewares/jwt';


const router = Router();

// Get all items
router.get('/', ReportController.getAll);

// Get one item
router.get('/:id', ReportController.getById);

// Create a new item
router.post('/', ReportController.newItem);

// Edit item
router.patch('/:id', ReportController.editItem);

// Delete
router.delete('/:id', ReportController.deleteItem);

export default router;