import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const UserRelation = sequelize.define('UserRelation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dieticianId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  acceptdAt: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING,
  },

}, {
  tableName: 'user_relations',
  timestamps: false
});


export default UserRelation;