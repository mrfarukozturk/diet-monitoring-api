import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  updateAt: {
    type: DataTypes.DATE
  },
  content: {
    type: DataTypes.TEXT,
  },
  attachment: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'consultations',
  timestamps: false
});


export default Consultation;