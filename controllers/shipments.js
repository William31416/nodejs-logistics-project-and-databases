import pool from '../config/db.js';

export const getAllShipments = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM shipments');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

export const createShipment = async (req, res, next) => {
    try {
        const { item, quantity } = req.body;
        const [result] = await pool.query('INSERT INTO shipments (item, quantity) VALUES (?, ?)', [item, quantity]);
        res.status(201).json({
            message: 'Shipment created successfully',
            shipment: { id: result.insertId, item, quantity }
        });
    } catch (err) {
        next(err);
    }
};

export const getShipmentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

export const updateShipment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { item, quantity } = req.body;
        const [result] = await pool.query('UPDATE shipments SET item = ?, quantity = ? WHERE id = ?', [item, quantity, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json({ message: 'Shipment updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const deleteShipment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM shipments WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json({ message: 'Shipment deleted successfully' });
    } catch (err) {
        next(err);
    }
};
