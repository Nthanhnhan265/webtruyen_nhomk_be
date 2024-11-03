'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Định nghĩa quan hệ ở đây nếu cần
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user', // Tùy chọn này có thể điều chỉnh tùy theo yêu cầu
      })
      Review.belongsTo(models.Story, {
        foreignKey: 'story_id',
        as: 'story', // Tùy chọn này có thể điều chỉnh tùy theo yêu cầu
      })
    }
  }

  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  return Review
}

// const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = require('@config/db_config.js')

// const Review = sequelize.define(
//   'Review',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     story_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     star: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     comment: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: 'reviews',
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   },
// )

// module.exports = Review
