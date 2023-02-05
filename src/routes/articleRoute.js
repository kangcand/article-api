const router = require('express').Router();
const {
    article
} = require('../controllers');

/// CRUD operation for produk table
router.get('/articles', article.getAllArticle);
router.post('/articles', article.newArticle);
router.patch('/articles/:id', article.updateArticle);
router.delete('/articles/:id', article.deleteArticle);

module.exports = router;