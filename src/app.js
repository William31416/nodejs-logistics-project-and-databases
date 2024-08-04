import express from 'express';
import dotenv from 'dotenv';
import errorHandler from '../middlewares/errorHandler.js';
import warehouseRoutes from '../routes/warehouses.js';
import shipmentRoutes from '../routes/shipments.js';
import driverRoutes from '../routes/drivers.js';
import vehicleRoutes from '../routes/vehicles.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

app.use('/warehouses', warehouseRoutes);
app.use('/shipments', shipmentRoutes);
app.use('/drivers', driverRoutes);
app.use('/vehicles', vehicleRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});