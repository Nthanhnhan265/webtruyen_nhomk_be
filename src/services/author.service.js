const Author = require('../models/author.model');

// Tạo tác giả mới
const createAuthor = async (authorData) => {
    return await Author.create(authorData);
};

// Lấy tất cả tác giả
const getAllAuthors = async () => {
    return await Author.findAll();
};

// Lấy tác giả theo ID
const getAuthorById = async (id) => {
    return await Author.findByPk(id);
};

// Cập nhật tác giả
const updateAuthor = async (id, authorData) => {
    return await Author.update(authorData, { where: { id } });
};

// Xóa tác giả
const deleteAuthor = async (id) => {
    return await Author.destroy({ where: { id } });
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
