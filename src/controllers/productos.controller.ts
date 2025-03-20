import express from "express";
import mysql from "mysql2";
import connection from "../db.ts";

type Request = express.Request;
type Response = express.Response;

export const getAll = (req: Request, res: Response) => {
    connection.query("SELECT * FROM producto", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

export const getaddProduct = (req: any, res: any) => {
    const { nombre, precio, descripcion, categoria } = req.body;

    //if (!nombre || !precio || !descripcion) {
        //return res.status(400).json({ error: "Faltan datos requeridos" });
    //}

    const query = "INSERT INTO producto (nombre, precio, descripcion, categoria) VALUES (?, ?, ?, ?)";
    connection.query(query, [nombre, precio, descripcion, categoria || null], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const insertResult = result as mysql.ResultSetHeader;
        return res.json({ message: "Producto agregado", id: insertResult.insertId });
    });
};


export const updateProduct = (req: any, res: any) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria } = req.body;

    if (!nombre || !precio || !descripcion || !categoria) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const query = "UPDATE producto SET nombre = ?, precio = ?, descripcion = ?, categoria = ? WHERE id = ?";
    connection.query(query, [nombre, precio, descripcion, categoria, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const updateResult = result as mysql.ResultSetHeader;
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json({ message: "Producto actualizado", id });
    });
};


export const deleteProduct = (req: any, res: any) => {
    const { id } = req.params;

    const query = "DELETE FROM producto WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const deleteResult = result as mysql.ResultSetHeader;
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json({ message: "Producto eliminado", id });
    });
};
