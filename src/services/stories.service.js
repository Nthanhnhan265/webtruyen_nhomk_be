const Story = require("../models/story.model");
const { Op } = require('sequelize'); // Import toán tử Op từ Sequelize

// Tạo một câu chuyện mới với xử lý lỗi
exports.createStory = async (storyData) => {
  try {
    const story = await Story.create(storyData);
    return { success: true, data: story };
  } catch (error) {
    console.error("Lỗi khi tạo câu chuyện:", error);
    return { success: false, error: "Không thể tạo câu chuyện" };
  }
};

// Lấy tất cả các câu chuyện với xử lý lỗi
exports.getAllStories = async (author_storie, description, sortOrder, page, limit) => {
  console.log('check author_storie', author_storie);
  console.log('check description', description);
  console.log('check sortOrder', sortOrder);
  console.log('check page', page);
  console.log('check limit', limit);

  try {
    const whereConditions = [];

    // Xây dựng điều kiện where nếu title hoặc description được cung cấp
    if (author_storie) {
      whereConditions.push({
        story_name: {
          [Op.like]: `%${author_storie}%`
        }
      });
    }

    if (description) {
      whereConditions.push({
        description: {
          [Op.like]: `%${description}%`
        }
      });
    }

    console.log("Where Conditions:", whereConditions);

    // Lấy danh sách câu chuyện với phân trang
    const stories = await Story.findAll({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
      order: [['story_name', sortOrder === 'desc' ? 'DESC' : 'ASC']],
      offset: (page - 1) * limit,
      limit: limit,
    });

    // Log danh sách câu chuyện đã lấy
    // console.log("Danh sách câu chuyện đã lấy:", stories);

    // Đếm tổng số câu chuyện phù hợp với tiêu chí
    const totalCount = await Story.count({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
    });

    // Log tổng số câu chuyện
    console.log("Tổng số câu chuyện tìm thấy:", totalCount);

    // Trả về danh sách câu chuyện, tổng số và số trang
    const result = {
      stories: stories.length > 0 ? stories : [],
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit), // Tính tổng số trang
      currentPage: page
    };

    // Log kết quả trả về

    return result;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách câu chuyện:', error);
    throw new Error('Không thể lấy danh sách câu chuyện');
  }
};


// Lấy một câu chuyện theo ID với xử lý lỗi khi ID không tồn tại
exports.getStoryById = async (id) => {
  try {
    const story = await Story.findByPk(id);
    if (!story) {
      return { success: false, error: `Câu chuyện với ID ${id} không tồn tại` };
    }
    return { success: true, data: story };
  } catch (error) {
    console.error(`Lỗi khi lấy câu chuyện với ID ${id}:`, error);
    return { success: false, error: `Không thể lấy câu chuyện với ID ${id}` };
  }
};

// Cập nhật một câu chuyện với xử lý lỗi khi ID không tồn tại
exports.updateStory = async (id, storyData) => {
  try {
    const [updated] = await Story.update(storyData, { where: { id } });
    if (!updated) {
      return { success: false, error: `Câu chuyện với ID ${id} không tồn tại` };
    }
    const story = await Story.findByPk(id);
    return { success: true, data: story };
  } catch (error) {
    console.error(`Lỗi khi cập nhật câu chuyện với ID ${id}:`, error);
    return { success: false, error: `Không thể cập nhật câu chuyện với ID ${id}` };
  }
};

// Xóa một câu chuyện với xử lý lỗi khi ID không tồn tại
exports.deleteStory = async (id) => {
  try {
    const deleted = await Story.destroy({ where: { id } });
    if (!deleted) {
      return { success: false, error: `Câu chuyện với ID ${id} không tồn tại` };
    }
    return { success: true, message: "Xóa câu chuyện thành công" };
  } catch (error) {
    console.error(`Lỗi khi xóa câu chuyện với ID ${id}:`, error);
    return { success: false, error: `Không thể xóa câu chuyện với ID ${id}` };
  }
};

