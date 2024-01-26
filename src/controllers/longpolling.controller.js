const Contacto = require('../models/contacto.model');

const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const contactos = await Contacto.getAll({offset, limit}, {sort, order});

        let response = {
            message: "contactos obtenidos exitosamente",
            data: contactos
        };

        if (page && limit) {
            const totalContactos = await Contacto.count();
            response = {
                ...response,
                total: totalContactos,
                totalPages: Math.ceil(totalContactos / limit),
                currentPage: page
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los contactos",
            error: error.message
        });
    }
}

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    update
}