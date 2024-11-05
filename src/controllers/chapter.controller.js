const createHttpError = require('http-errors')
const {
  createChapter,
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

  const { error } = chapterValidate(req.body)

  if (error) {
    return next(error)
  }

  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10 if not specified
    const offset = (page - 1) * limit; // Calculate the starting point
    const storyId = req.query.storyId; // Get the story_id from the query

    const { count, rows } = await chapterService.getChapters(limit, offset, storyId);

    res.status(200).json({
      total: count, // Total number of records
      page, // Current page
      totalPages: Math.ceil(count / limit), // Total number of pages
      chapters: rows, // Chapter data for the current page
    });
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
      status: 200,
      message: message.chapter.fetchSuccess,
      data: chapter,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

// UPDATE CHAPTER BY ID
async function handleUpdateChapter(req, res, next) {
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
      status: 200,
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
      status: 200,
      data: [],
      links: [],
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  handleGetChapterByID,
  handleCreateChapter,
  handleDeleteChapter,
  handleUpdateChapter,
}
