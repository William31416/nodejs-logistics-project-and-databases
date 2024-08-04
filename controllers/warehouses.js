import pool from '../config/db.js';

export const getAllWarehouses = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM warehouses');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

export const createWarehouse = async (req, res, next) => {
    try {
        const { name, location } = req.body;
        const [result] = await pool.query('INSERT INTO warehouses (name, location) VALUES (?, ?)', [name, location]);
        res.status(201).json({
            message: 'Warehouse created successfully',
            warehouse: { id: result.insertId, name, location }
        });
    } catch (err) {
        next(err);
    }
};

export const getWarehouseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

export const updateWarehouse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const [result] = await pool.query('UPDATE warehouses SET name = ?, location = ? WHERE id = ?', [name, location, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json({ message: 'Warehouse updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const deleteWarehouse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM warehouses WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json({ message: 'Warehouse deleted successfully' });
    } catch (err) {
        next(err);
    }
};