const chapterService = require("../services/chapter.service");

// Create a new chapter
exports.createChapter = async (req, res) => {
  try {
    const chapter = await chapterService.createChapter(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all chapters
exports.getChapters = async (req, res) => {
  console.log("checkquery chapter", req.query);
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10 if not specified
    const offset = (page - 1) * limit; // Calculate the starting point
    const storyId = req.query.storyId; // Get the story_id from the query

    const { count, rows } = await chapterService.getChapters(
      limit,
      offset,
      storyId
    );

    res.status(200).json({
      total: count, // Total number of records
      page, // Current page
      totalPages: Math.ceil(count / limit), // Total number of pages
      chapters: rows, // Chapter data for the current page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a chapter by ID
exports.getChapterById = async (req, res) => {
  try {
    const chapter = await chapterService.getChapterById(req.params.id);
    if (!chapter) return res.status(404).json({ error: "Chapter not found" });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a chapter by ID
exports.getChapterBySlug = async (req, res) => {
  try {
    const chapter = await chapterService.getChapterBySlug(req.params.chapter);
    if (!chapter) return res.status(404).json({ error: "Chapter not found" });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a chapter
exports.updateChapter = async (req, res) => {
  try {
    const updatedChapter = await chapterService.updateChapter(
      req.params.id,
      req.body
    );
    if (!updatedChapter)
      return res.status(404).json({ error: "Chapter not found" });
    res.status(200).json(updatedChapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a chapter
exports.deleteChapter = async (req, res) => {
  try {
    const deleted = await chapterService.deleteChapter(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Chapter not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
