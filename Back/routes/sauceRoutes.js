const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceController = require('../controllers/sauceController');

router.post('/', auth, multer, sauceController.createSauce);
router.get('/:id', auth, sauceController.GetOneSauce);
router.get('/', auth, sauceController.getAllSauces);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.likeSauce);

module.exports = router;