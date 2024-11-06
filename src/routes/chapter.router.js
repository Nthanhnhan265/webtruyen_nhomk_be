// routes/chapter.router.js
const express = require("express");
const {
  handleCreateChapter,
  handleUpdateChapter,
  handleDeleteChapter,
  getChaptersByStory,
} = require("@controllers/chapter.controller");

const router = express.Router();
//===================
// Chapter Create API Endpoint
//===================
router.post("/", handleCreateChapter);
// v
router.get("/chapterByStory", getChaptersByStory);

//===================
// Chapter Read API Endpoints
//===================

// GET /stories/:story_id/chapters - Lấy danh sách tất cả các chương của một truyện
// router.get('/:story_id/chapters', handleGetChapters)

// GET /chapters/:slug -  người dùng nhập slug-truyen/slug-chuong để xem một chương cụ thể
// router.get('/:slug', handleGetChapterBySlug)

//===================
// Chapter Update API Endpoint
//===================
router.patch("/:id", handleUpdateChapter);

//===================
// Chapter Delete API Endpoint
//===================
router.delete("/:id", handleDeleteChapter);

module.exports = router;
