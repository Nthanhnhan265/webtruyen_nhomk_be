// services/genreService.js
const { Genre } = require('../models')

class GenreService {
  static async getAllGenres() {
    try {
      return await Genre.findAll()
    } catch (error) {
      throw new Error('Error fetching genres')
    }
  }

  static async getGenreById(id) {
    try {
      const genre = await Genre.findByPk(id)
      if (!genre) throw new Error('Genre not found')
      return genre
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async createGenre(data) {
    try {
      const { genre_name, description, slug } = data
      return await Genre.create({ genre_name, description, slug })
    } catch (error) {
      throw new Error('Error creating genre')
    }
  }

  static async updateGenre(id, data) {
    try {
      const genre = await Genre.findByPk(id)
      if (!genre) throw new Error('Genre not found')

      genre.genre_name = data.genre_name || genre.genre_name
      genre.description = data.description || genre.description
      genre.slug = data.slug || genre.slug

      await genre.save()
      return genre
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async deleteGenre(id) {
    try {
      const genre = await Genre.findByPk(id)
      if (!genre) throw new Error('Genre not found')
      await genre.destroy()
      return { message: 'Genre deleted successfully' }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async getGenresBySlug(slug) {
    try {
      const genre = await Genre.findAll({
        where: {
          slug: slug,
        },
      })
      return genre
    } catch (error) {
      throw new Error(error.message)
    }
  }
 
}

module.exports = GenreService
