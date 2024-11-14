'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      // Định nghĩa quan hệ ở đây nếu cần
      // Ví dụ: Genre.hasMany(models.Story, { foreignKey: 'genre_id', as: 'stories' });
      Genre.belongsToMany(models.Story, {
        through: models.StoryGenre,
        foreignKey: 'genre_id',
        otherKey: 'story_id',
        as: 'stories',
      })
    }
  }

  Genre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      genre_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Genre',
      tableName: 'genres',
      timestamps: false,
    },
  )
  return Genre
}
