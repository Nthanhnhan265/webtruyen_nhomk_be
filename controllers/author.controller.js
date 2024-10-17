const authorService = require('../services/author.service');

// Tạo tác giả mới
const createAuthor = async (req, res) => {
    try {
        const { author_name, description, slug } = req.body;
        const newAuthor = await authorService.createAuthor({ author_name, description, slug });
        res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        res.status(400).json({ message: 'Error creating author', error });
    }
};

// Lấy danh sách tất cả tác giả
const getAllAuthors = async (req, res) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching authors', error });
    }
};

// Lấy chi tiết một tác giả
const getAuthorById = async (req, res) => {
    try {
        const author = await authorService.getAuthorById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching author', error });
    }
};

// Cập nhật tác giả
const updateAuthor = async (req, res) => {
    try {
        const { author_name, description, slug } = req.body;
        const updatedAuthor = await authorService.updateAuthor(req.params.id, { author_name, description, slug });
        if (!updatedAuthor[0]) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json({ message: 'Author updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error updating author', error });
    }
};

// Xóa tác giả
const deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await authorService.deleteAuthor(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting author', error });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
