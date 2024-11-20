const authorService = require('../services/author.service');
const message = require('../../message');

// Tạo tác giả mới
const createAuthor = async (req, res) => {
    try {
        const { author_name, description, slug } = req.body;
        console.log("check create", req);

        const newAuthor = await authorService.createAuthor({ author_name, description, slug });
        res.status(201).json({ message: message.author.createSuccess, author: newAuthor });
    } catch (error) {
        res.status(400).json({ message: message.author.createFailed, error });
    }
};

// Lấy danh sách tất cả tác giả
const getAllAuthorsName = async (req, res) => {
    console.log("kiểm tra tham số", req.query);

    try {
        const authors = await authorService.getAllAuthorsName();
        res.status(200).json({
            success: message.author.fetchSuccess
            , data: authors
        });
    } catch (error) {
        res.status(500).json({ message: message.author.error, error });
    }
};
const getAllAuthors = async (req, res) => {
    console.log("kiểm tra tham số", req.query);

    try {
        const { author_name, description, sortBy, sort, page, limit = 10 } = req.query; // Mặc định trang đầu tiên và giới hạn 10 hàng

        const { authors, totalCount, totalPages, currentPage } = await authorService.getAllAuthors(author_name, description, sortBy, sort, page, limit);
        res.status(200).json({
            success: message.author.fetchSuccess,
            totalCount: totalCount
            , totalPages: totalPages,
            currentPage: currentPage
            , data: authors
        });
    } catch (error) {
        res.status(500).json({ message: message.author.error, error });
    }
};


// Lấy chi tiết một tác giả
const getAuthorById = async (req, res) => {
    console.log("check get one");

    try {
        const author = await authorService.getAuthorById(req.params.id);
        console.log(req);

        if (!author) return res.status(404).json({ message: message.author.notFound });
        res.status(200).json({
            message: message.author.fetchSuccess,
            data: author
        });
    } catch (error) {
        res.status(400).json({ message: message.author.notFound, error });
    }
};

// Cập nhật tác giả
const updateAuthor = async (req, res) => {
    try {
        const { author_name, description, slug } = req.body;
        const updatedAuthor = await authorService.updateAuthor(req.params.id, { author_name, description, slug });
        if (!updatedAuthor[0]) return res.status(404).json({ message: "không có sự thay đổi" });
        res.status(200).json({
            message: message.author.updateSuccess,
            data: updatedAuthor
        });
    } catch (error) {
        res.status(400).json({ message: message.author.updateFailed, error });
    }
};

// Xóa tác giả
const deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await authorService.deleteAuthor(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: message.author.notFound });
        res.status(200).json({ message: message.author.deleteSuccess });
    } catch (error) {
        res.status(400).json({ message: message.author.deleteFailed, error });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    getAllAuthorsName
};
