import { Router } from 'express';
import {
    getAllShipments,
    createShipment,
    getShipmentById,
    updateShipment,
    deleteShipment
} from '../controllers/shipments.js';

const router = Router();

router.get('/', getAllShipments);
router.post('/', createShipment);
router.get('/:id', getShipmentById);
router.put('/:id', updateShipment);
router.delete('/:id', deleteShipment);

export default router;