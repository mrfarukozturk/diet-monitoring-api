import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  birthday:{
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "client"
  },
  mobilePhone: {
    type: DataTypes.STRING,
  },
  adress: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.TEXT,
  }

}, {
  tableName: 'users',
  timestamps: false
});


export default User;