const express = require("express");
const router = express.Router();
const storiesController = require("../controllers/story.Controller");
const { uploadSingleFile } = require('../middlewares/upload.middleware')


router.post("/create", uploadSingleFile("cover"), storiesController.createStory);
router.get("/", storiesController.getStories);
router.get("/:id", storiesController.getStoryById);
router.put("/update/:id", uploadSingleFile("cover"), storiesController.updateStory);
router.delete("/delete/:id", storiesController.deleteStory);

module.exports = router;
