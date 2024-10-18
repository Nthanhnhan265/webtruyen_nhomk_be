const express = require("express");
const router = express.Router();
const storiesController = require("../controllers/story.Controller");

router.post("/create", storiesController.createStory);
router.get("/", storiesController.getStories);
router.get("/:id", storiesController.getStoryById);
router.put("/update/:id", storiesController.updateStory);
router.delete("/delete/:id", storiesController.deleteStory);

module.exports = router;
