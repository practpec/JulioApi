const db = require('../configs/db.config');

class Venta {

    constructor({ id, subtotal, descuento, total, createdAt, updatedAt }) {
        this.id = id;
        this.subtotal = subtotal;
        this.descuento = descuento;
        this.total = total;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async save() {
        const connection = await db.createConnection();

        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO ventas (subtotal, descuento, total, created_at) VALUES (?, ?, ?, ?)", [this.subtotal, this.descuento, this.total, createdAt]);

        connection.end();
        
        if (result.insertId === 0) {
            throw new Error("no se insertó la venta");
        }

        this.id = result.insertId;
        this.createdAt = createdAt;

        return this.id;
    }

    async saveWithTransaction(connection) {
        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO ventas (subtotal, descuento, total, created_at) VALUES (?, ?, ?, ?)", [this.subtotal, this.descuento, this.total, createdAt]);
        
        if (result.insertId === 0) {
            throw new Error("no se insertó la venta");
        }

        return result.insertId;
    }
}

module.exports = Venta;