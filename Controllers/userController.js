import pool from "../config/db.js"

export const getuser = async (req, res, next) => {
    try {
        const response = await pool.query("SELECT * FROM profiles");
        res.status(200).json({
            message: "Data succesfully fetched",
            data: response.rows
        });
    } catch (error) {
        next(error);
    }
};

export const createuser = async (req, res, next) => {
    const { name, age, email, phone, address } = req.body;
    try {
        const response = await pool.query(
            "INSERT INTO profiles(name, age, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, age, email, phone, address]
        );
        res.status(201).json({
            message: "Data CREATE succesfully",
            data: response.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

export const putuser = async (req, res, next) => {
    const id = req.params.id;
    const { name, age, email, phone, address } = req.body;
    try {
        const response = await pool.query(
            "UPDATE profiles SET name=$1, age=$2, email=$3, phone=$4, address=$5 WHERE id=$6 RETURNING *",
            [name, age, email, phone, address, id]
        );
        res.status(200).json({
            message: "Data update succesfully",
            data: response.rows[0]
        });
    } catch (error) {
        next(error);
    }
};
