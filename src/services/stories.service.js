const { Story, Author } = require('../models')
const { Op } = require('sequelize') // Import toán tử Op từ Sequelize
const message = require('../../message')
const createError = require('http-errors')

// Tạo một câu chuyện mới với xử lý lỗi
exports.createStory = async (storyData) => {
  try {
    const story = await Story.create(storyData)
    return { success: true, data: story }
  } catch (error) {
    console.error('Lỗi khi tạo câu chuyện:', error)
    return { success: false, error: 'Không thể tạo câu chuyện' }
  }
}

// Lấy tất cả các câu chuyện với xử lý lỗi
exports.getAllStories = async (
  story_name,
  description,
  sortOrder,
  page,
  limit,
) => {
  try {
    // Kiểm tra các tham số
    if (story_name && typeof story_name !== 'string') {
      throw this.createError(message.story.story_nameRequired)
    }

    if (description && typeof description !== 'string') {
      throw createError(message.story.descriptionRequired)
    }

    const validSortOrders = ['ASC', 'DESC']
    if (sortOrder && !validSortOrders.includes(sortOrder.toUpperCase())) {
      throw createError(message.story.sortOrderRequired)
    }

    const pageInt = parseInt(page)
    if (isNaN(pageInt) || pageInt < 1) {
      throw createError(message.story.pageRequired)
    }

    const limitInt = parseInt(limit)
    if (isNaN(limitInt) || limitInt < 1) {
      throw createError(message.story.limitRequired)
    }

    const whereConditions = []

    // Xây dựng điều kiện where nếu story_name hoặc description được cung cấp
    if (story_name) {
      whereConditions.push({
        story_name: {
          [Op.like]: `%${story_name}%`,
        },
      })
    }

    if (description) {
      whereConditions.push({
        description: {
          [Op.like]: `%${description}%`,
        },
      })
    }

    console.log('Where Conditions:', whereConditions)

    // Lấy danh sách câu chuyện với phân trang
    const stories = await Story.findAll({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
      order: [['story_name', sortOrder ? sortOrder.toUpperCase() : 'ASC']], // Mặc định là ASC nếu không có sortOrder
      offset: (pageInt - 1) * limitInt,
      limit: limitInt,
      attributes: [
        'id',
        'status',
        'author_id',
        'description',
        'story_name',
        'total_chapters',
        'views',
        'cover',
        'keywords',
        'slug',
      ],
      include: [
        {
          model: Author,
          attributes: ['author_name', 'id'],
        },
      ],
    })

    console.log(stories)
    // Đếm tổng số câu chuyện phù hợp với tiêu chí
    const totalCount = await Story.count({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
    })

    // Trả về danh sách câu chuyện, tổng số và số trang
    const result = {
      stories: stories.length > 0 ? stories : [],
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limitInt), // Tính tổng số trang
      currentPage: pageInt,
    }

    return result
  } catch (error) {
    console.error(message.story.error, error)
    throw createError(message.story.error, error.message)
  }
}
// v
exports.getAllStorieView = async (
  story_name,
  description,
  sortOrder,
  page,
  limit,
) => {
  console.log('check story_name:', story_name)
  console.log('check description:', description)
  console.log('check sortOrder:', sortOrder)
  console.log('check page:', page)
  console.log('check limit:', limit)

  try {
    // Kiểm tra các tham số
    if (story_name && typeof story_name !== 'string') {
      throw this.createError(message.story.story_nameRequired)
    }

    if (description && typeof description !== 'string') {
      throw createError(message.story.descriptionRequired)
    }

    const pageInt = parseInt(page)
    if (isNaN(pageInt) || pageInt < 1) {
      throw createError(message.story.pageRequired)
    }

    const limitInt = parseInt(limit)
    if (isNaN(limitInt) || limitInt < 1) {
      throw createError(message.story.limitRequired)
    }

    const whereConditions = []

    // Xây dựng điều kiện where nếu story_name hoặc description được cung cấp
    if (story_name) {
      whereConditions.push({
        story_name: {
          [Op.like]: `%${story_name}%`,
        },
      })
    }

    if (description) {
      whereConditions.push({
        description: {
          [Op.like]: `%${description}%`,
        },
      })
    }

    console.log('Where Conditions:', whereConditions)

    // Lấy danh sách câu chuyện với phân trang
    const stories = await Story.findAll({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
      order: [['views', 'DESC']], // Sắp xếp theo views giảm dần
      offset: (pageInt - 1) * limitInt,
      limit: limitInt,
      attributes: [
        'id',
        'status',
        'author_id',
        'description',
        'story_name',
        'total_chapters',
        'views',
        'cover',
        'keywords',
        'slug',
      ],
    })

    // Đếm tổng số câu chuyện phù hợp với tiêu chí
    const totalCount = await Story.count({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
    })

    // Trả về danh sách câu chuyện, tổng số và số trang
    const result = {
      stories: stories.length > 0 ? stories : [],
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limitInt), // Tính tổng số trang
      currentPage: pageInt,
    }

    return result
  } catch (error) {
    console.error(message.story.error, error)
    throw createError(message.story.error, error.message)
  }
}
// storyService.js
// v
exports.getStoryBySlug = async (slug) => {
  try {
    console.log(slug)
    const story = await Story.findOne({
      where: { slug }, // Tìm theo slug
      attributes: [
        'id',
        'status',
        'author_id',
        'description',
        'story_name',
        'total_chapters',
        'views',
        'cover',
        'keywords',
        'slug',
        'updated_at',
      ],
    })

    return story
  } catch (error) {
    console.error('Error fetching story by slug:', error)
    throw error
  }
}

// v
exports.getAllStorieNew = async (
  story_name,
  description,
  sortOrder,
  page,
  limit,
) => {
  console.log('HAM NEW')
  console.log('check story_name:', story_name)
  console.log('check description:', description)
  console.log('check sortOrder:', sortOrder)
  console.log('check page:', page)
  console.log('check limit:', limit)

  try {
    // Kiểm tra các tham số
    if (story_name && typeof story_name !== 'string') {
      throw createError(message.story.story_nameRequired)
    }

    if (description && typeof description !== 'string') {
      throw createError(message.story.descriptionRequired)
    }

    const pageInt = parseInt(page)
    if (isNaN(pageInt) || pageInt < 1) {
      throw createError(message.story.pageRequired)
    }

    const limitInt = parseInt(limit)
    if (isNaN(limitInt) || limitInt < 1) {
      throw createError(message.story.limitRequired)
    }

    const whereConditions = []

    // Xây dựng điều kiện where nếu story_name hoặc description được cung cấp
    if (story_name) {
      whereConditions.push({
        story_name: {
          [Op.like]: `%${story_name}%`,
        },
      })
    }

    if (description) {
      whereConditions.push({
        description: {
          [Op.like]: `%${description}%`,
        },
      })
    }

    console.log('Where Conditions:', whereConditions)

    // Lấy danh sách câu chuyện với phân trang
    const stories = await Story.findAll({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
      order: [['updated_at', 'DESC']], // Sắp xếp theo ngày cập nhật mới nhất
      offset: (pageInt - 1) * limitInt,
      limit: limitInt,
      attributes: [
        'id',
        'status',
        'author_id',
        'description',
        'story_name',
        'total_chapters',
        'views',
        'cover',
        'keywords',
        'slug',
        'updated_at', // Thêm updated_at để hiển thị ngày cập nhật
      ],
    })

    // Đếm tổng số câu chuyện phù hợp với tiêu chí
    const totalCount = await Story.count({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
    })

    // Trả về danh sách câu chuyện, tổng số và số trang
    const result = {
      stories: stories.length > 0 ? stories : [],
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limitInt), // Tính tổng số trang
      currentPage: pageInt,
    }

    return result
  } catch (error) {
    console.error(message.story.error, error)
    throw createError(message.story.error, error.message)
  }
}

// Lấy một câu chuyện theo ID với xử lý lỗi khi ID không tồn tại
exports.getStoryById = async (id) => {
  try {
    const story = await Story.findByPk(id)
    if (!story) {
      return { success: false, message: message.story.notFound }
    }
    return { success: true, data: story }
  } catch (error) {
    console.error(`Lỗi khi lấy câu chuyện với ID ${id}:`, error)
    return { success: false, error: message.story.notFound }
  }
}

// Cập nhật một câu chuyện với xử lý lỗi khi ID không tồn tại
exports.updateStory = async (id, storyData) => {
  try {
    // Kiểm tra xem câu chuyện có tồn tại không trước khi cập nhật
    const story = await Story.findOne({ where: { id } })
    if (!story) {
      // Nếu không tìm thấy câu chuyện, ném lỗi với mã trạng thái 404
      throw createError(404, message.story.notFound)
    }

    // Thực hiện cập nhật dữ liệu câu chuyện
    const updatedRows = await Story.update(storyData, { where: { id } })

    if (updatedRows === 0) {
      // Nếu không có hàng nào được cập nhật, có thể là không có thay đổi nào
      throw createError(400, message.story.noChanges)
    }

    // Lấy lại thông tin câu chuyện sau khi cập nhật
    const updatedStory = await Story.findOne({ where: { id } })

    // Trả về đối tượng thành công với dữ liệu câu chuyện đã cập nhật
    return { success: true, data: updatedStory }
  } catch (error) {
    console.error(`Lỗi khi cập nhật câu chuyện với ID ${id}:`, error)

    // Kiểm tra xem lỗi có phải là một lỗi do người dùng gửi không
    if (error.status && error.message) {
      throw createError(error.status, error.message)
    }

    // Nếu lỗi không xác định, ném lỗi 500 Internal Server Error
    throw createError(500, message.story.updateFailed)
  }
}

// Xóa một câu chuyện với xử lý lỗi khi ID không tồn tại
exports.deleteStory = async (id) => {
  try {
    // Kiểm tra xem câu chuyện có tồn tại không trước khi xóa
    const story = await Story.findOne({ where: { id } })
    if (!story) {
      throw createError({ status: 404, message: message.story.notFound }) // Đặt status là 404 cho không tìm thấy
    }

    // Nếu câu chuyện tồn tại, thực hiện xóa
    await Story.destroy({ where: { id } })
    return { success: true, message: message.story.deleteSuccess }
  } catch (error) {
    // console.error(`Lỗi khi xóa câu chuyện với ID ${id}:`, error);
    // Nếu error không có thông tin message, trả về thông báo mặc định
    const errorMessage =
      error.message || 'Không thể xóa câu chuyện. Vui lòng thử lại sau.'
    throw createError({ success: false, message: errorMessage }) // Trả về thông báo lỗi chi tiết
  }
}
