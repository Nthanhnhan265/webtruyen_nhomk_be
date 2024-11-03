// routes/chapter.router.js
const express = require('express')
const {
  handleCreateChapter,
  handleGetChapters,
  handleGetChapterBySlug,
  handleUpdateChapter,
  handleDeleteChapter,
} = require('@controllers/chapter.controller')

const router = express.Router()

//===================
// Chapter Create API Endpoint
//===================
router.post('/', handleCreateChapter)

//===================
// Chapter Read API Endpoints
//===================

// GET /stories/:story_id/chapters - Lấy danh sách tất cả các chương của một truyện
router.get('/:story_id/chapters', handleGetChapters)

// GET /chapters/:slug - Lấy thông tin chi tiết của một chương theo slug
router.get('/:slug', handleGetChapterBySlug)

//===================
// Chapter Update API Endpoint
//===================
router.patch('/:id', handleUpdateChapter)

//===================
// Chapter Delete API Endpoint
//===================
router.delete('/:id', handleDeleteChapter)

module.exports = router