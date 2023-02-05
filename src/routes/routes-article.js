const router = require('express').Router();
const {
    article
} = require('../controllers');

router.get('/articles', article.getAllArticle);
router.post('/article', article.newArticle);
router.patch('/article/:id', article.updateArticle);
router.delete('/article/:id', article.deleteArticle);

module.exports = router;