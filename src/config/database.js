import User from "../model/user-model.js";
import UserRelation from "../model/user-relation-model.js";
import Consultation from "../model/consultation-model.js";
import Meal from "../model/meal-model.js";
import Measurement from "../model/measurement-model.js";
import sequelize from './connection.js';

/*
User.hasMany(UserRelation, { foreignKey: 'authorId' });
User.hasMany(UserRelation, { foreignKey: 'dieticianId' });
User.hasMany(UserRelation, { foreignKey: 'clientId' });

*/


User.hasOne(UserRelation, { foreignKey: 'dieticianId' });
User.hasOne(UserRelation, { foreignKey: 'clientId' });



//Consultation.belongsTo(User);

//UserRelation.belongsTo( User, { foreignKey: 'authorId' } );
//UserRelation.belongsTo( User, { foreignKey: 'dieticianId' } );
//UserRelation.belongsTo( User, { foreignKey: 'clientId' } );
//Comment.belongsTo(Post, { foreignKey: 'postId' });

//User.hasMany(Comment, { foreignKey: 'userId', onDelete: "CASCADE" });//foreignKey is used to name the foreign key, if you remove it userId will be named as UserId automatically, which is generated automatically by sequelize
//Comment.belongsTo(User, { foreignKey: 'userId' });

//Post.hasMany(Comment, { foreignKey: 'postId' });
//Comment.belongsTo(Post, { foreignKey: 'postId' });

//User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
//Post.belongsTo(User, { foreignKey: 'userId' });
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectToDatabase();