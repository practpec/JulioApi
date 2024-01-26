const express = require('express');
const router = express.Router();
const shortpollingController = require('../controllers/shortpolling.controller');


router.get('/', shortpollingController.index);
router.get('/update', shortpollingController.update);
router.post('/', shortpollingController.create);
router.delete('/:id', shortpollingController.deleteFisico);


module.exports = router;