import pool from '../config/db.js';

export const getAllVehicles = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vehicles');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

export const createVehicle = async (req, res, next) => {
    try {
        const { model, year } = req.body;
        const [result] = await pool.query('INSERT INTO vehicles (model, year) VALUES (?, ?)', [model, year]);
        res.status(201).json({
            message: 'Vehicle created successfully',
            vehicle: { id: result.insertId, model, year }
        });
    } catch (err) {
        next(err);
    }
};

export const getVehicleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

export const updateVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { model, year } = req.body;
        const [result] = await pool.query('UPDATE vehicles SET model = ?, year = ? WHERE id = ?', [model, year, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const deleteVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
        next(err);
    }
};