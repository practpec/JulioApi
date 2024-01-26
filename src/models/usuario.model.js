const db = require('../configs/db.config');

class Usuario {

    constructor({ id, name, email, password}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async getAll({ offset, limit }, { sort, order }) {
        const connection = await db.createConnection();
        let query = "SELECT id, name, email, password FROM users";

        if (sort && order) {
            query += ` ORDER BY ${sort} ${order}`
        }

        if (offset >= 0 && limit) {
            query += ` LIMIT ${offset}, ${limit}`;
        }

        const [rows] = await connection.query(query);
        connection.end();

        return rows;
    }

    static async getById(id) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT id, name, email, password FROM users WHERE id = ? ", [id]);
        connection.end();

        if (rows.length > 0) {
            const row = rows[0];
            return new Usuario({ id: row.id, name:row.name, email: row.email, password: row.password});
        }

        return null;
    }

    static async deleteFisicoById(id) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);
        connection.end();

        if (result.affectedRows == 0) {
            throw new Error("no se eliminó el usuario");
        }

        return
    }

    static async count() {
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT COUNT(*) AS totalCount FROM usuarios WHERE deleted = 0");
        connection.end();

        return rows[0].totalCount;
    }

    async save() {
        const connection = await db.createConnection();

        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO usuarios (email, password, created_at) VALUES (?, ?, ?)", [this.email, this.password, createdAt]);

        connection.end();

        if (result.insertId === 0) {
            throw new Error("No se insertó el usuario");
        }

        this.id = result.insertId;
        this.deleted = 0;
        this.createdAt = createdAt;
        this.updatedAt = null;
        this.deletedAt = null;

        return
    }
}

module.exports = Usuario;