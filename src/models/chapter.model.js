// <<<<<<< thong-tin-truyen
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db_config"); // Assuming you have a database config

// const Chapter = sequelize.define(
//   "Chapter",
// =======
// const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = require('@config/db_config.js')

// const Chapter = sequelize.define(
//   'Chapter',
// >>>>>>> dev
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     chapter_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     story_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     slug: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     views: {
//       type: DataTypes.INTEGER,
// <<<<<<< thong-tin-truyen
//       defaultValue: 0,
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: "draft", // or 'published'
//     },
//     chapter_order: {
//       type: DataTypes.INTEGER,
//     },
//     published_at: {
//       type: DataTypes.DATE,
//     },
//   },
//   {
//     timestamps: true,
//     createdAt: "created_at",
//     updatedAt: "updated_at",
//   }
// );

// module.exports = Chapter;
// =======
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     chapter_order: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'chapters',
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   },
// )

// module.exports = Chapter
// >>>>>>> dev


const { DataTypes } = require('sequelize'); // Giữ import gọn gàng nếu không cần `Sequelize`
const sequelize = require('@config/db_config.js'); // Điều chỉnh đường dẫn config cho nhất quán

const Chapter = sequelize.define(
  'Chapter',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chapter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Giữ giá trị mặc định nếu cần
    },
    status: {
      type: DataTypes.STRING, // Điều chỉnh thành STRING nếu có nhiều trạng thái
      defaultValue: 'draft',
    },
    chapter_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true, // Cho phép null nếu không phải chapter nào cũng được publish ngay
    },
  },
  {
    tableName: 'chapters', // Tên bảng trong CSDL
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Chapter;
