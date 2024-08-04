import pool from '../config/db.js';

export const getAllDrivers = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM drivers');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

export const createDriver = async (req, res, next) => {
    try {
        const { name } = req.body;
        const [result] = await pool.query('INSERT INTO drivers (name) VALUES (?)', [name]);
        res.status(201).json({
            message: 'Driver created successfully',
            driver: { id: result.insertId, name }
        });
    } catch (err) {
        next(err);
    }
};

export const getDriverById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

export const updateDriver = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const [result] = await pool.query('UPDATE drivers SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json({ message: 'Driver updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const deleteDriver = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM drivers WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json({ message: 'Driver deleted successfully' });
    } catch (err) {
        next(err);
    }
};
