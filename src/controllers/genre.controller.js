// controllers/genreController.js
const message = require('../../message');
const GenreService = require('../services/genre.service');

const getAllGenresByName = async (req, res) => {
    try {
        const genres = await GenreService.getAllGenres();
        console.log(genres);

        res.json({
            message: "lay du lieu thanh cong",
            data: genres
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGenreById = async (req, res) => {
    try {
        const genre = await GenreService.getGenreById(req.params.id);
        res.json(genre);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createGenre = async (req, res) => {
    try {
        const newGenre = await GenreService.createGenre(req.body);
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await GenreService.updateGenre(req.params.id, req.body);
        res.json(updatedGenre);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteGenre = async (req, res) => {
    try {
        const result = await GenreService.deleteGenre(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const handleGetGenresBySlug = async (req, res) => {
    const { slug } = req.params
    console.log('>>slug duoc goi1: ', slug)
    //xac thuc du lieu
  
    const result = await GenreService.getGenresBySlug(slug)
    console.log(result)
    return res.status(200).json(result)
  }
const handleGetStoriesByGenre = async (req, res) => {
    const { slug } = req.params
    console.log('>>slug duoc goi2: ', slug)
    //xac thuc du lieu
  
    const result = await GenreService. getStoriesByGenre(slug)
    console.log(result)
    return res.status(200).json(result)
  }
//   import hàm
module.exports = {
    getAllGenresByName,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
    handleGetGenresBySlug,
    handleGetStoriesByGenre,
};
