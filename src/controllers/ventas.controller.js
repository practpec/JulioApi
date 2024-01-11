const db = require('../configs/db.config');
const Venta = require('../models/venta.model');
const DetalleVenta = require('../models/detalleVenta.model');

const create = async (req, res) => {
    try {
        const venta = new Venta({
            subtotal: req.body.subtotal,
            descuento: req.body.descuento,
            total: req.body.total
        });

        const idVenta = await venta.save();

        for (d of req.body.detalle) {
            const detalle = new DetalleVenta({ idVenta, ...d });
            await detalle.save();
        }

        return res.status(200).json({
            message: "venta creada exitosamente",
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear la venta",
            error: error.message
        })
    }
}

const createWithTransaction = async (req, res) => {
    const connection = await db.createConnection();

    try {
        await connection.beginTransaction();

        const venta = new Venta({
            subtotal: req.body.subtotal,
            descuento: req.body.descuento,
            total: req.body.total
        });

        const idVenta = await venta.saveWithTransaction(connection);

        for (d of req.body.detalle) {
            const detalle = new DetalleVenta({ idVenta, ...d });
            await detalle.saveWithTransaction(connection);
        }

        await connection.commit();

        return res.status(200).json({
            message: "venta creada exitosamente",
        })

    } catch (error) {
        await connection.rollback();

        return res.status(500).json({
            message: "ocurrió un error al crear la venta",
            error: error.message
        })
    }
}

module.exports = {
    create: createWithTransaction
}