
const db = require('../configs/db.config');

class Contacto {

    constructor({ id, id_user, id_contact }) {
        this.id = id;
        this.id_user = id_user;
        this.id_contact = id_contact;
    }

    static async getAll({ offset, limit }, { sort, order }) {
        const connection = await db.createConnection();
        let query = "SELECT id, id_user, id_contac FROM contacts";

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


    static async deleteFisicoById(id) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("DELETE FROM contacts WHERE id = ?", [id]);
        connection.end();

        if (result.affectedRows == 0) {
            throw new Error("no se eliminó el contacto");
        }

        return
    }

  

    static async count() {
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT COUNT(*) AS totalCount FROM constacts");
        connection.end();

        return rows[0].totalCount;
    }

    async save() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO contacts (id_user, id_contact) VALUES (?, ?)", [this.id_user, this.id_contact]);

        connection.end();

        if (result.insertId === 0) {
            throw new Error("No se insertó el usuario");
        }

        this.id = result.insertId;

        return
    }
}

module.exports = Contacto;