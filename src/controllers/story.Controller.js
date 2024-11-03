const { Story } = require('../models')

// Tạo một câu chuyện mới
exports.createStory = async (req, res) => {
  console.log("check create storie", req.body);

  try {
    // Gọi hàm tạo câu chuyện từ storyService với dữ liệu từ req.body
    const story = await storyService.createStory(req.body);
    res.status(201).json(story); // Trả về câu chuyện đã tạo với mã trạng thái 201 (Created)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(400).json({ error: error.message });
  }
}

exports.getStories = async (req, res) => {
  try {
    // Lấy các tham số truy vấn từ request
    const { author_storie, description, sort, page = 1, limit = 10 } = req.query;
    console.log("check param", req.query);


    // Gọi hàm getAllStories với các tham số để tìm kiếm, sắp xếp, và phân trang
    const stories = await storyService.getAllStories(author_storie, description, sort, parseInt(page), parseInt(limit));

    // Trả về danh sách câu chuyện với mã trạng thái 200 (OK)
    res.status(200).json(stories);
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message });
  }
}


// Lấy một câu chuyện theo ID
exports.getStoryById = async (req, res) => {
  try {
    // Gọi hàm lấy câu chuyện theo ID từ storyService
    const story = await storyService.getStoryById(req.params.id);
    if (!story) return res.status(404).json({ error: "Không tìm thấy câu chuyện" });
    res.status(200).json(story); // Trả về câu chuyện với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message });
  }
}

// Cập nhật một câu chuyện
exports.updateStory = async (req, res) => {
  try {
    // Gọi hàm cập nhật câu chuyện từ storyService với ID và dữ liệu cập nhật từ req.body
    const updatedStory = await storyService.updateStory(req.params.id, req.body);
    if (!updatedStory) return res.status(404).json({ error: "Không tìm thấy câu chuyện" });
    res.status(200).json(updatedStory); // Trả về câu chuyện đã cập nhật với mã trạng thái 200 (OK)
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(400).json({ error: error.message });
  }
}

// Xóa một câu chuyện
exports.deleteStory = async (req, res) => {
  try {
    // Gọi hàm xóa câu chuyện từ storyService với ID
    const deleted = await storyService.deleteStory(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy câu chuyện" });
    res.status(204).send(); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi nếu có
    res.status(500).json({ error: error.message });
  }
}
