<<<<<<< HEAD
const createHttpError = require('http-errors')
const {
  createChapter,
  getChapters,
  getChapterByID,
  updateChapter,
  deleteChapterByID,
  getChapterBySlug,
} = require('@services/chapter.service')
const message = require('@root/message')
const { chapterValidate } = require('@helper/validation')

// ================================================
//              Chapter Handler Functions
// ================================================

// CREATE CHAPTER
async function handleCreateChapter(req, res, next) {
  const {
    chapter_name,
    content,
    story_id,
    slug,
    views,
    status,
    chapter_order,
  } = req.body

  const { error } = chapterValidate({
    chapter_name,
    content,
    story_id,
    slug,
    views,
    status,
    chapter_order,
  })

  if (error) {
    return next(error)
  }

  try {
    const newChapter = await createChapter({
      chapter_name,
      content,
      story_id,
      slug,
      views,
      status,
      chapter_order,
    })

    return res.status(201).json({
      success: true,
      status: 201,
      message: message.chapter.createSuccess,
      data: newChapter,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

// READ CHAPTERS
async function handleGetChapters(req, res, next) {
  try {
    const { data, pagination } = await getChapters()

    return res.status(200).json({
      success: true,
      message: message.chapter.fetchSuccess,
      data: data,
      pagination: pagination,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

// GET CHAPTER BY ID
async function handleGetChapterByID(req, res, next) {
  try {
    const id = req.params.id
    const chapter = await getChapterByID(id)

    if (!chapter) {
      return next(createHttpError(404, message.chapter.notFound))
    }

    return res.status(200).json({
      success: true,
      message: message.chapter.fetchSuccess,
      data: chapter,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

// UPDATE CHAPTER BY ID
async function handleUpdateChapterByID(req, res, next) {
  try {
    const id = req.params.id
    const {
      chapter_name,
      content,
      story_id,
      slug,
      views,
      status,
      chapter_order,
    } = req.body

    const { error } = chapterValidate(
      {
        chapter_name,
        content,
        story_id,
        slug,
        views,
        status,
        chapter_order,
      },
      true,
    ) // true to indicate that it's an update

    if (error) {
      return next(error)
    }

    const updatedChapter = await updateChapter(id, {
      chapter_name,
      content,
      story_id,
      slug,
      views,
      status,
      chapter_order,
    })

    return res.status(200).json({
      success: true,
      message: message.chapter.updateSuccess,
      data: updatedChapter,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

// DELETE CHAPTER
async function handleDeleteChapter(req, res, next) {
  const id = req.params.id
  try {
    const result = await deleteChapterByID(id)
    if (result.error) {
      return next(result.error)
    }

    return res.status(200).json({
      success: true,
      message: message.chapter.deleteSuccess,
      data: [],
      links: [],
    })
  } catch (error) {
    return next(error)
  }
}

// GET CHAPTER BY SLUG
async function handleGetChapterBySlug(req, res, next) {
  try {
    const slug = req.params.slug
    const chapter = await getChapterBySlug(slug)

    if (!chapter) {
      return next(createHttpError(404, message.chapter.notFound))
    }

    return res.status(200).json({
      success: true,
      message: message.chapter.fetchSuccess,
      data: chapter,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  handleGetChapters,
  handleGetChapterByID,
  handleCreateChapter,
  handleDeleteChapter,
  handleUpdateChapterByID,
  handleGetChapterBySlug,
}
=======
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
>>>>>>> dev
