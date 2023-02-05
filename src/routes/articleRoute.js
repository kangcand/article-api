const router = require('express').Router();
const {
    movie
} = require('../controllers');

/// CRUD operation for produk table
router.get('/articles', movie.getAllMovie);
router.post('/articles', movie.newMovie);
router.patch('/articles/:id', movie.updateMovie);
router.delete('/articles/:id', movie.deleteMovie);

module.exports = router;