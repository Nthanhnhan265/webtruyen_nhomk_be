const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('@config/db_config.js')

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'role',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)
Role.associate = function (models) {
  Role.hasMany(models.User, {
    foreignKey: 'role_id',
    constraints: false,
  })
}
module.exports = Role
