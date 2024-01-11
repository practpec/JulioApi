const db = require('../configs/db.config');

class DetalleVenta {

    constructor({id, idVenta, idProducto, cantidad, precio, subtotal, descuento, total, createdAt, updatedAt}) {
        this.id = id;
        this.idVenta = idVenta;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.subtotal = subtotal;
        this.descuento = descuento;
        this.total = total;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async save() {
        const connection = await db.createConnection();

        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio, subtotal, descuento, total, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [this.idVenta, this.idProducto, this.cantidad, this.precio, this.subtotal, this.descuento, this.total, createdAt]);
        connection.end();

        if (result.insertId === 0) {
            throw new Error("no se insertó el detalle de la venta");
        }

        this.id = result.insertId;
        this.createdAt = createdAt;

        return this.id
    }

    async saveWithTransaction(connection) {
        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio, subtotal, descuento, total, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [this.idVenta, this.idProducto, this.cantidad, this.precio, this.subtotal, this.descuento, this.total, createdAt]);

        if (result.insertId === 0) {
            throw new Error("no se insertó el detalle de la venta");
        }

        return result.insertId;
    }

    setIdVenta(idVenta) {
        this.idVenta = idVenta;
    }
}

module.exports = DetalleVenta;