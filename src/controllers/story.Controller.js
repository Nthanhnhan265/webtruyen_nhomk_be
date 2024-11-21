const message = require("../../message");
const { Story, Genre, Author } = require('../models');
const storyService = require("../services/stories.service");
const {
  getChaptersByStoryId,
  getChapterBySlug,
} = require("../services/chapter.service");
const createHttpError = require("http-errors");
// Tạo một câu chuyện mới
exports.createStory = async (req, res) => {
 
//   console.log("check create storie", req.body);
//   const uploadedFile = req.file;
//   const avatar = uploadedFile ? uploadedFile.filename : null;
//   try {
//     // Gọi hàm tạo câu chuyện từ storyService với dữ liệu từ req.body
//     const story = await storyService.createStory(req.body);
 
  console.log('check create storie', req.body)
  const { status, author_id, description, story_name, total_chapters, views, keywords, slug } = req.body;
  const uploadedFile = req.file
  const cover = uploadedFile ? uploadedFile.filename : null
  try {
    // Gọi hàm tạo câu chuyện từ storyService với dữ liệu từ req.body
    const story = await storyService.createStory({ status, author_id, description, story_name, total_chapters, views, cover, keywords, slug })
 
    res.status(201).json({
      message: message.story.createSuccess,
      success: true,
      story: story,
    }); // Trả về câu chuyện đã tạo với mã trạng thái 201 (Created)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res
      .status(400)
      .json({ message: message.story.deleteFailed, error: error.message });
 
  }
};

exports.getStories = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const { story_name, description, sort, page, limit = 10 } = req.query;
    console.log("check param", req.query);

    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const { stories, totalCount, totalPages, currentPage } =
      await storyService.getAllStories(
        story_name,
        description,
        sort,
        page,
        parseInt(limit)
      );

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json({
      message: message.story.fetchSuccess,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      stories: stories,
    });
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.notFound,
      error: error.message,
    });
  }
};
// v
exports.getAllStorieView = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const { story_name, description, sort, page, limit = 10 } = req.query;
    console.log("check param", req.query);

    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const { stories, totalCount, totalPages, currentPage } =
      await storyService.getAllStorieView(
        story_name,
        description,
        sort,
        page,
        parseInt(limit)
      );

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json({
      message: message.story.fetchSuccess,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      stories: stories,
    });
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.notFound,
      error: error.message,
    });
  }
};
// v
exports.getAllStorieNew = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const { story_name, description, sort, page, limit = 10 } = req.query;
    console.log("check param", req.query);

    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const { stories, totalCount, totalPages, currentPage } =
      await storyService.getAllStorieNew(
        story_name,
        description,
        sort,
        page,
        parseInt(limit)
      );

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json({
      message: message.story.fetchSuccess,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      stories: stories,
    });
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.notFound,
      error: error.message,
    });
  }
};

// Lấy một câu chuyện theo ID
exports.getStoryBySlug = async (req, res) => {
  try {
    // Gọi hàm lấy câu chuyện theo ID từ storyService
    console.log(req);
    const story = await storyService.getStoryBySlug(req.params.slug);
    if (!story)
      return res.status(404).json({ error: "Không tìm thấy câu chuyện" });
    res.status(200).json(story); // Trả về câu chuyện với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message });
  }
};
exports.getStoryById = async (req, res) => {
  try {
    // Gọi hàm lấy câu chuyện theo ID từ storyService
    const story = await storyService.getStoryById(req.params.id);
    if (!story)
      return res.status(404).json({ error: "Không tìm thấy câu chuyện" });
    res.status(200).json(story); // Trả về câu chuyện với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message });
  }
};
// storyService.js
// Cập nhật một câu chuyện
exports.updateStory = async (req, res) => {
  console.log("check du lieu cua update stories", req);

  const { status, author_id, description, story_name, total_chapters, views, keywords, slug } = req.body;
  const uploadedFile = req.file
  const cover = uploadedFile ? uploadedFile.filename : null;
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
 
    const updatedStory = await storyService.updateStory(req.params.id, { status, author_id, description, story_name, total_chapters, views, cover, keywords, slug })
    if (!updatedStory)
      return res.status(404).json({ error: 'Không tìm thấy câu chuyện' })
    res.status(200).json(

      {
        success: true,
        updatedStory: updatedStory

      }
    ) // Trả về câu chuyện đã cập nhật với mã trạng thái 200 (OK)
 
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(400).json({ error: error.message });
  }
};

// Xóa một câu chuyện
exports.deleteStory = async (req, res) => {
  try {
    // Gọi hàm xóa câu chuyện từ storyService với ID
    const deleted = await storyService.deleteStory(req.params.id);
    // if (!deleted) return res.status(404).json({ message: "Không tìm thấy câu chuyện" });
    res.status(200).json({
      message: message.story.deleteSuccess,
      data: deleted,
    }); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({
      message: message.story.deleteFailed,
      error: error.message,
    });
  }
};
// lấy chương truyện bằng vào story_id
exports.getChaptersByStory = async function handleGetChapters(req, res, next) {
  try {
    const { story_id } = req.params; // Lấy story_id từ params
    const { data, pagination } = await getChaptersByStoryId(story_id);

    // if (!data.length) {
    //   return res.status(404).json({
    //     success: false,
    //     status: 404,
    //     message: message.chapter.storyNotFound,
    //     links: []
    //   })
    // }

    return res.status(200).json({
      success: true,
      status: 200,
      message: message.chapter.fetchSuccess,
      data: data,
      pagination: pagination,
      links: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: message.chapter.fetchChaptersFailed,
      error: error.message,
    });
  }
};

// GET CHAPTER BY SLUG: slug-truyen/slug-chuong
exports.getChapterBySlug = async function GetChapterBySlug(req, res, next) {
  try {
    const { slugStory, slugChapter } = req.params;
    const chapter = await getChapterBySlug(slugChapter);

    if (!chapter) {
      return next(createHttpError(404, message.chapter.notFound));
    }
    if (chapter.Story.slug !== slugStory) {
      return next(createHttpError(404, message.chapter.notFound));
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: message.chapter.fetchSuccess,
      data: chapter,
      links: [],
    });
  } catch (error) {
    next(error);
  }
};
// exports.getStoriesByGenre = async (req, res) => {
//   const { slug } = req.params; // Lấy slug từ URL

//   try {
//     const stories = await storyService.getStoriesByGenreSlug(slug);
//     res.status(200).json({ stories });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
 // controller story
exports.getStoriesByGenre = async (req, res) => {
  const { slug } = req.params;  // Lấy slug của thể loại từ URL
  let { page = 1, limit = 10 } = req.query;  // Lấy tham số page và limit từ query, mặc định là page = 1, limit = 10

  page = parseInt(page, 10); // Đảm bảo page là số nguyên
  limit = parseInt(limit, 10); // Đảm bảo limit là số nguyên

  try {
    // Gọi service để lấy danh sách câu chuyện theo thể loại với phân trang
    const stories = await storyService.getStoriesByGenreSlug(slug, page, limit);

    // Truy vấn tổng số câu chuyện trong thể loại này để tính tổng số trang
    const totalStories = await Story.count({
      include: [
        {
          model: Genre,
          as: 'genres',
          where: { slug: slug },
        }
      ]
    });

    // Tính tổng số trang
    const totalPages = Math.ceil(totalStories / limit);

    // Tính toán phân trang
    const pagination = {
      currentPage: page,
      totalPages: totalPages, // Tổng số trang
      hasNext: page < totalPages,
      hasPrevious: page > 1,
      nextPage: page + 1 <= totalPages ? page + 1 : null,
      previousPage: page - 1 >= 1 ? page - 1 : null
    };

    // Đưa dữ liệu câu chuyện vào đúng định dạng
    const storiesData = stories.map(story => ({
      story_id: story.id,
      story_name: story.story_name,
      story_slug: story.slug,
      cover: story.cover,
      total_chapters: story.total_chapters,
      genres: story.genres.map(genre => ({
        genre_name: genre.genre_name,
        genre_slug: genre.slug
      })),
      author: {
        author_name: story.author.author_name,
        author_slug: story.author.slug
      }
    }));

    // Trả về dữ liệu bao gồm câu chuyện và thông tin phân trang
    return res.status(200).json({
      message: true,
      totalPages, // Tổng số trang
      pagination, // Thông tin phân trang
      data: {
        stories: storiesData
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// module.exports = { getStoriesByGenre };
