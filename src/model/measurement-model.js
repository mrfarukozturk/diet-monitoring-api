import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const Measurement = sequelize.define('Measurement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  measureAt: {
    type: DataTypes.DATE
  },  
  measurements: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'measurements',
  timestamps: false
});


export default Measurement;