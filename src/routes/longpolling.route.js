const express = require('express');
const router = express.Router();
const longpollingController = require('../controllers/longpollingController');

router.get('/', longpollingController.index);
router.get('/nueva', longpollingController.getById);
router.post('/', longpollingController.create);
router.delete('/:id', longpollingController.delete);


module.exports = router;