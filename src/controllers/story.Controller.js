const { Story } = require('../models')

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body)
    res.status(201).json(story)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.findAll()
    res.status(200).json(stories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id)
    if (!story) return res.status(404).json({ error: 'Story not found' })
    res.status(200).json(story)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a story
exports.updateStory = async (req, res) => {
  try {
    const [updated] = await Story.update(req.body, {
      where: { id: req.params.id },
    })
    if (!updated) return res.status(404).json({ error: 'Story not found' })
    const updatedStory = await Story.findByPk(req.params.id)
    res.status(200).json(updatedStory)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a story
exports.deleteStory = async (req, res) => {
  try {
    const deleted = await Story.destroy({
      where: { id: req.params.id },
    })
    if (!deleted) return res.status(404).json({ error: 'Story not found' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
