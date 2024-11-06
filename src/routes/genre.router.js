// routes/genre.router.js
const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

// Route để lấy tất cả genres
router.get('/', genreController.getAllGenresByName);

// Route để lấy một genre cụ thể theo ID
router.get('/:id', genreController.getGenreById);

// Route để tạo một genre mới
router.post('/', genreController.createGenre);

// Route để cập nhật một genre theo ID
router.put('/:id', genreController.updateGenre);

// Route để xóa một genre theo ID
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
