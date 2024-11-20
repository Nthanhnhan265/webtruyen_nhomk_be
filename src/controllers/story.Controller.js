const message = require('../../message')
const storyService = require('../services/stories.service')
const {
  getChaptersByStoryId,
  getChapterBySlug,
} = require('../services/chapter.service')
const createHttpError = require('http-errors')
// Tạo một câu chuyện mới
exports.createStory = async (req, res) => {
  //   console.log("check create storie", req.body);
  //   const uploadedFile = req.file;
  //   const avatar = uploadedFile ? uploadedFile.filename : null;
  //   try {
  //     // Gọi hàm tạo câu chuyện từ storyService với dữ liệu từ req.body
  //     const story = await storyService.createStory(req.body);

  console.log('check create storie', req.body)
  const {
    status,
    author_id,
    description,
    story_name,
    total_chapters,
    views,
    keywords,
    slug,
  } = req.body
  const uploadedFile = req.file
  const cover = uploadedFile ? uploadedFile.filename : null
  try {
    // Gọi hàm tạo câu chuyện từ storyService với dữ liệu từ req.body
    const story = await storyService.createStory({
      status,
      author_id,
      description,
      story_name,
      total_chapters,
      views,
      cover,
      keywords,
      slug,
    })

    res.status(201).json({
      message: message.story.createSuccess,
      success: true,
      story: story,
    }) // Trả về câu chuyện đã tạo với mã trạng thái 201 (Created)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res
      .status(400)
      .json({ message: message.story.deleteFailed, error: error.message })
  }
}

exports.getStories = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const {
      story_name,
      description,
      sortBy,
      sort,
      page,
      limit = 10,
    } = req.query
    console.log('check param', req.query)

    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const { stories, totalCount, totalPages, currentPage } =
      await storyService.getAllStories(
        story_name,
        description,
        sortBy,
        sort,
        page,
        parseInt(limit),
      )

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json({
      message: message.story.fetchSuccess,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      stories: stories,
    })
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.notFound,
      error: error.message,
    })
  }
}
// v
exports.getAllStorieView = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const { story_name, description, sort, page, limit = 10 } = req.query
    console.log('check param', req.query)

    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const { stories, totalCount, totalPages, currentPage } =
      await storyService.getAllStorieView(
        story_name,
        description,
        sort,
        page,
        parseInt(limit),
      )

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json({
      message: message.story.fetchSuccess,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      stories: stories,
    })
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.notFound,
      error: error.message,
    })
  }
}
// v
exports.getAllStorieNew = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const { story_name, description, sort, page, limit = 10 } = req.query
    console.log('check param', req.query)

    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const { stories, totalCount, totalPages, currentPage } =
      await storyService.getAllStorieNew(
        story_name,
        description,
        sort,
        page,
        parseInt(limit),
      )

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json({
      message: message.story.fetchSuccess,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      stories: stories,
    })
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.notFound,
      error: error.message,
    })
  }
}

// Lấy một câu chuyện theo ID
exports.getStoryBySlug = async (req, res) => {
  try {
    // Gọi hàm lấy câu chuyện theo ID từ storyService
    console.log(req)
    const story = await storyService.getStoryBySlug(req.params.slug)
    if (!story)
      return res.status(404).json({ error: 'Không tìm thấy câu chuyện' })
    res
      .status(200)
      .json({ success: true, message: 'lay du lieu thanh cong', data: story }) // Trả về câu chuyện với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message })
  }
}
exports.getStoryById = async (req, res) => {
  try {
    // Gọi hàm lấy câu chuyện theo ID từ storyService
    const story = await storyService.getStoryById(req.params.id)
    if (!story)
      return res.status(404).json({ error: 'Không tìm thấy câu chuyện' })
    res.status(200).json(story) // Trả về câu chuyện với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message })
  }
}
// storyService.js
// Cập nhật một câu chuyện
exports.updateStory = async (req, res) => {
  console.log('check du lieu cua update stories', req)

  const {
    status,
    author_id,
    description,
    story_name,
    total_chapters,
    views,
    keywords,
    slug,
  } = req.body
  const uploadedFile = req.file
  const cover = uploadedFile ? uploadedFile.filename : null
  // const id = req.params.id;
  try {
    // Gọi hàm cập nhật câu chuyện từ storyService với ID và dữ liệu cập nhật từ req.body
    //     const updatedStory = await storyService.updateStory(
    //       req.params.id,
    //       req.body
    //     );
    //     if (!updatedStory)
    //       return res.status(404).json({ error: "Không tìm thấy câu chuyện" });
    //     res.status(200).json(updatedStory); // Trả về câu chuyện đã cập nhật với mã trạng thái 200 (OK)

    const updatedStory = await storyService.updateStory(req.params.id, {
      status,
      author_id,
      description,
      story_name,
      total_chapters,
      views,
      cover,
      keywords,
      slug,
    })
    if (!updatedStory)
      return res.status(404).json({ error: 'Không tìm thấy câu chuyện' })
    res.status(200).json({
      success: true,
      updatedStory: updatedStory,
    }) // Trả về câu chuyện đã cập nhật với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(400).json({ error: error.message })
  }
}

// Xóa một câu chuyện
exports.deleteStory = async (req, res) => {
  try {
    // Gọi hàm xóa câu chuyện từ storyService với ID
    const deleted = await storyService.deleteStory(req.params.id)
    // if (!deleted) return res.status(404).json({ message: "Không tìm thấy câu chuyện" });
    res.status(200).json({
      message: message.story.deleteSuccess,
      data: deleted,
    }) // Trả về mã trạng thái 204 (No Content) khi xóa thành công
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.deleteFailed,
      error: error.message,
    })
  }
}
// lấy chương truyện bằng vào story_id
exports.getChaptersByStory = async function handleGetChapters(req, res, next) {
  try {
    const { story_id } = req.params // Lấy story_id từ params
    const { story, chapters, pagination } = await getChaptersByStoryId(story_id)

    return res.status(200).json({
      success: true,
      status: 200,
      message: message.chapter.fetchSuccess,
      data: {
        story: story,
        chapters: chapters,
      },
      pagination: pagination,
      links: [],
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: message.chapter.fetchChaptersFailed,
      error: error.message,
    })
  }
}

// GET CHAPTER BY SLUG: slug-truyen/slug-chuong
exports.getChapterBySlug = async function GetChapterBySlug(req, res, next) {
  try {
    const { slugStory, slugChapter } = req.params
    const chapter = await getChapterBySlug(slugChapter)

    if (!chapter) {
      return next(createHttpError(404, message.chapter.notFound))
    }
    if (chapter.Story.slug !== slugStory) {
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

