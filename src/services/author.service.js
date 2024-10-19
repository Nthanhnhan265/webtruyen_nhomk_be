const Author = require('../models/author.model');

// Tạo tác giả mới
const createAuthor = async (authorData) => {
    return await Author.create(authorData);
};

// Lấy tất cả tác giả
const getAllAuthors = async (sortOrder) => {
    try {
        const authors = await Author.findAll({
            order: [
                // ['author_name', sortOrder === 'desc' ? 'DESC' : 'ASC'], // Sort by author_name
                ['author_name', sortOrder === 'desc' ? 'ASC' : 'DESC'], // Sort by author_name
            ],
        });
        return authors;
    } catch (error) {
        console.error('Error fetching authors:', error);
        throw error; // Handle the error appropriately
    }
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
