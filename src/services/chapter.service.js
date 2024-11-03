// services/chapter.service.js
const { Chapter } = require('@models')
const createError = require('http-errors')
const message = require('@root/message')
const { Op } = require('sequelize')

// ==========================
// Chapter CRUD Functions
// ==========================

exports.getChapters = async (limit, offset, storyId) => {
  console.log("service storyId ", storyId);
  console.log("service limit ", limit);
  console.log("service offset ", offset);

  return await Chapter.findAndCountAll({
    where: { story_id: storyId },
    limit,
    offset,
  });
};

exports.getChapterById = async (id) => {
  return await Chapter.findByPk(id);
};

exports.updateChapter = async (id, chapterData) => {
  const [updated] = await Chapter.update(chapterData, {
    where: { id },
  });
  if (updated) {
    return await Chapter.findByPk(id);
    // CREATE CHAPTER
    /**
     * Tạo một chương mới.
     * @param {Object} chapter - Đối tượng chứa thông tin chương mới.
     * @returns {Promise<Object>} - Trả về đối tượng chương đã được tạo.
     */
    async function createChapter(chapter) {
      try {
        return await Chapter.create(chapter)
      } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          throw createError(400, error.errors.map((err) => err.message).join(', '))
        } else {
          throw createError(500, message.chapter.createFailed)
        }
      }
    }

    // READ CHAPTERS
    /**
     * Lấy danh sách tất cả chương truyện.
     * @returns {Promise<Array>} - Trả về danh sách chương truyện.
     */
    async function getChapters(
      sortBy = 'chapter_order',
      order = 'ASC',
      page = 1,
      limit = 10,
      offset = 0,
    ) {
      const total = await Chapter.count()
      const data = await Chapter.findAll({
        order: [[sortBy, order]],
        limit: limit,
        offset: offset,
      })

      const pagination = {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      }
      return { data, pagination }
    }

    /**
     * Tìm kiếm chương theo từ khóa.
     * @param {string} keyword - Từ khóa tìm kiếm.
     * @param {string} [sortBy='chapter_order'] - Trường sắp xếp.
     * @param {string} [order='ASC'] - Thứ tự sắp xếp.
     * @param {number} [page=1] - Số trang.
     * @param {number} [limit=10] - Số lượng bản ghi trên mỗi trang.
     * @returns {Promise<{data: Array, pagination: Object}>} - Dữ liệu chương và thông tin phân trang.
     */
    async function searchChapters(
      keyword,
      sortBy = 'chapter_order',
      order = 'ASC',
      page = 1,
      limit = 10,
      offset = 0,
    ) {
      const total = await Chapter.count({
        where: {
          [Op.or]: [
            { chapter_name: { [Op.like]: `%${keyword}%` } },
            { content: { [Op.like]: `%${keyword}%` } },
          ],
        },
      })

      const data = await Chapter.findAll({
        where: {
          [Op.or]: [
            { chapter_name: { [Op.like]: `%${keyword}%` } },
            { content: { [Op.like]: `%${keyword}%` } },
          ],
        },
        order: [[sortBy, order]],
        limit: limit,
        offset: offset,
      })

      const pagination = {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      }

      return { data, pagination }
    }

    /**
     * Lấy thông tin chi tiết của một chương theo ID.
     * @param {number} id - ID của chương cần lấy thông tin.
     * @returns {Promise<Object|null>} - Trả về đối tượng chương hoặc null nếu không tìm thấy.
     */
    async function getChapterByID(id) {
      return await Chapter.findByPk(id)
    }

    /**
     * Lấy thông tin chi tiết của một chương theo slug.
     * @param {string} slug - Slug của chương cần lấy thông tin.
     * @returns {Promise<Object|null>} - Trả về đối tượng chương hoặc null nếu không tìm thấy.
     */
    async function getChapterBySlug(slug) {
      const chapter = await Chapter.findOne({ where: { slug } })
      if (!chapter) {
        throw createError(404, message.chapter.notFound)
      }
      return chapter
    }

    // UPDATE CHAPTER
    /**
     * Cập nhật thông tin chương.
     * @param {number} id - ID của chương cần cập nhật.
     * @param {Object} updatedData - Đối tượng chứa dữ liệu cập nhật.
     * @returns {Promise<Object>} - Trả về đối tượng chương đã được cập nhật.
     */
    async function updateChapter(id, updatedData) {
      try {
        const currentChapter = await Chapter.findByPk(id)
        if (!currentChapter) {
          throw createError(404, message.chapter.notFound)
        }
        const [affectedCount] = await Chapter.update(updatedData, { where: { id } })

        if (affectedCount === 0) {
          throw createError(400, message.generalErrors.NoUpdate)
        }

        return await Chapter.findByPk(id)
      } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          throw createError(400, error.errors.map((err) => err.message).join(', '))
        } else {
          throw createError(500, message.chapter.updateFailed)
        }
      }
    }

    // DELETE CHAPTER
    /**
     * Xóa một chương theo ID.
     * @param {number} id - ID của chương cần xóa.
     * @returns {Promise<void>} - Không trả về giá trị.
     */
    async function deleteChapterById(id) {
      try {
        const chapter = await Chapter.findByPk(id)
        if (!chapter) {
          throw createError(404, message.chapter.notFound)
        }
        await chapter.destroy()
        return { success: true, message: message.chapter.deleteSuccess }
      } catch (error) {
        throw createError(500, message.chapter.deleteFailed)
      }
    }

    module.exports = {
      createChapter,
      getChapters,
      getChapterByID,
      getChapterBySlug,
      updateChapter,
      deleteChapterById,
      searchChapters,
    }
  }
}
