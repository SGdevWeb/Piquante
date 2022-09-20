const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceController = require('../controllers/sauceController');

router.post('/', auth, multer, sauceController.createSauce);
router.get('/:id', sauceController.GetOneSauce);
router.get('/', sauceController.getAllSauces);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.post('/:id/like', sauceController.likeSauce);

module.exports = router;