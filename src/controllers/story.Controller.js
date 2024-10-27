const storyService = require("../services/stories.service");

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const story = await storyService.createStory(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await storyService.getStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await storyService.getStoryById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a story
exports.updateStory = async (req, res) => {
  try {
    const updatedStory = await storyService.updateStory(
      req.params.id,
      req.body
    );
    if (!updatedStory)
      return res.status(404).json({ error: "Story not found" });
    res.status(200).json(updatedStory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a story
exports.deleteStory = async (req, res) => {
  try {
    const deleted = await storyService.deleteStory(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Story not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
