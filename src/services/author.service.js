const Author = require('../models/author.model');
const { Op } = require('sequelize'); // Import toán tử Op từ Sequelize

// Tạo tác giả mới
const createAuthor = async (authorData) => {
    return await Author.create(authorData);
};


const getAllAuthors = async (author_name, description, sortOrder, page, limit) => {
    console.log("check author_name", author_name);
    console.log("check description", description);
    console.log("check sort", sortOrder);
    console.log("check page", page);
    console.log("check limit", limit);

    try {
        const whereConditions = {};

        if (author_name) {
            whereConditions.author_name = {
                [Op.like]: `%${author_name}%`
            };
        }

        if (description) {
            whereConditions.description = {
                [Op.like]: `%${description}%`
            };
        }
        console.log(whereConditions);

        const authors = await Author.findAll({
            where: {
                [Op.or]: whereConditions,// Use Op.or to search for either condition
            },
            order: [
                ['author_name', sortOrder === 'desc' ? 'DESC' : 'ASC'],
            ],
            offset: (page - 1) * limit, // Tính toán offset cho phân trang
            limit: limit, // Giới hạn số lượng hàng
        });

        return authors;
    } catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
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
