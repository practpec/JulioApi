const Grupo = require('../models/grupo.model');

async function create(req, res) {
    try {
        const nuevoGrupo = new Grupo({
            name: req.body.name,
            id_user: req.body.id_user
        });

        await nuevoGrupo.save();

        return res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Error al insertar el grupo"
        });
    }
}

async function index(req, res) {
    try {
        const todosLosGrupos = await Grupo.getAll({}, {});

        return res.status(200).json({
            success: true,
            grupos: todosLosGrupos
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener todos los grupos"
        });
    }
}

async function update(req, res) {
    try {
        const ultimoIdGrupo = parseInt(req.query.idGrupo, 10);

        const nuevosGrupos = (await Grupo.getAll({}, {})).filter(grupo => grupo.id > ultimoIdGrupo);

        return res.status(200).json({
            success: true,
            grupos: nuevosGrupos
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener los nuevos grupos"
        });
    }
}
const deleteFisico = async (req, res) => {
    try {
        const id = req.params.id;

        await Grupo.deleteFisicoById(id);

        return res.status(200).json({
            message: "se eliminó el grupo correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el grupo",
            error: error.message
        })
    }
}

module.exports = {
    create,
    index,
    update,
    deleteFisico
};
