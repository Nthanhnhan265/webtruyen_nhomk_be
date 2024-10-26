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
    const page = parseInt(req.query.page) || 1; // Trang mặc định là 1 nếu không có tham số
    const limit = parseInt(req.query.limit) || 10; // Số bản ghi mỗi trang mặc định là 10
    const offset = (page - 1) * limit; // Tính toán điểm bắt đầu

    const { count, rows } = await chapterService.getChapters(limit, offset);

    res.status(200).json({
      total: count, // Tổng số bản ghi
      page, // Trang hiện tại
      totalPages: Math.ceil(count / limit), // Tổng số trang
      chapters: rows, // Dữ liệu chapters của trang hiện tại
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
