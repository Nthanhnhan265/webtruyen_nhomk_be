const express = require("express");
const chapterController = require("../controllers/chapter.controller");
const router = express.Router();

router.post("/chapters/create", chapterController.createChapter);
router.get("/chapters", chapterController.getChapters);
router.get("/chapters/:id", chapterController.getChapterById);
router.put("/chapters/update/:id", chapterController.updateChapter);
router.delete("/chapters/delete/:id", chapterController.deleteChapter);

module.exports = router;
