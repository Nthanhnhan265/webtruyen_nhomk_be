const express = require('express')
const router = express.Router()
const storiesController = require('../controllers/story.Controller')

router.post('/create', storiesController.createStory)
router.get('/', storiesController.getStories)
router.get('/:id', storiesController.getStoryById)
router.put('/update/:id', storiesController.updateStory)
router.delete('/delete/:id', storiesController.deleteStory)

// GET /stories/:story_id/chapters - Lấy danh sách tất cả các chương của một truyện bằng id cua truyen
router.get('/:story_id/chapters', storiesController.getChaptersByStory)

// GET stories/:slug-truyen/:slug-chuong -  người dùng nhập slug-truyen/slug-chuong để xem một chương cụ thể
// router.get('/:slugStory/:slugChapter', storiesController.getChapterBySlug)

module.exports = router
