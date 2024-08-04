import { Router } from 'express';
import {
    getAllWarehouses,
    createWarehouse,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
} from '../controllers/warehouses.js';

const router = Router();

router.get('/', getAllWarehouses);
router.post('/', createWarehouse);
router.get('/:id', getWarehouseById);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

export default router;
