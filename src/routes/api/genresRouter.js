const express = require('express');
const router = express.Router();
const genresController = require('../../controllers/api/genresController');


router.get('/', genresController.list);
//Si en app.js marcamos /api solo router.get('/genres',genresController.list)
router.get('/detail/:id', genresController.detail);
//router.get('/genres/detail/:id',genresController.list)


module.exports = router;