import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const Meal = sequelize.define('Meal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dieticienId: {
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
  meals: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  tableName: 'meals',
  timestamps: false
});


export default Meal;