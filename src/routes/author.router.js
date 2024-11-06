const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');

// Định nghĩa các route cho các API CRUD
router.post('/create', authorController.createAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/authorsName', authorController.getAllAuthorsName);
router.get('/:id', authorController.getAuthorById);
router.put('/update/:id', authorController.updateAuthor);
router.delete('/delete/:id', authorController.deleteAuthor);

module.exports = router;
