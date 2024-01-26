const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.index);
router.get('/:id', usuariosController.getById);
router.post('/', usuariosController.create);

router.patch('/:id', usuariosController.update);

module.exports = router;