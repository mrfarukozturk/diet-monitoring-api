import UserRelation from "../model/user-relation-model.js"
import User from "../model/user-model.js";
import { Op } from 'sequelize';


//ToClient
const createInvitationToClient = async (pUser) => {
  try {
    // Check if user with provided email already exists
    let existingUser = await User.findOne({ where: { email: pUser.email } });
    if (!existingUser) {
      existingUser = await User.create(pUser);
    }

    const existingRelation = await UserRelation.findOne({ 
      where: { 
        dieticianId: pUser.dieticianId, 
        clientId:existingUser.id,
        status:{
          [Op.or]: ["invitation", "active"]
        }
      } 
    });

    if ( !existingRelation ) {
      const newRelation = await UserRelation.create( { ...pUser, ...{ clientId: existingUser.id, status:"invitation" } } );
      return newRelation;
    }

    return false;

  } catch (error) {
    console.log(error);
    throw error;
  }
};



const getUsersByDieticianId = async ( dieticianId, order ) => {
  User.hasOne(UserRelation, { foreignKey: 'clientId' });

  try {
    const users = await User.findAll(
      { 
        include : { 
          model:UserRelation,
          where: { 
            dieticianId:dieticianId,
            status:{
              [Op.or]: ["invitation", "active"]
            }
          } 
        }, 
        order: [
          [{ model: UserRelation }, 'id', order],
          [{ model: UserRelation }, 'createdAt', order],
          //['createdAt', order],['id', order]
        ] 
      }
    )
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }
}



const getUsersByClientId = async ( clientId, order ) => {
  User.hasOne(UserRelation, { foreignKey: 'dieticianId' });

  try {
    const users = await User.findAll(
      { 
        include : { 
          model:UserRelation,
          where: { 
            clientId: clientId,
            status:{
              [Op.or]: ["invitation", "active"]
            }
          } 
        }, 
        order: [
          [{ model: UserRelation }, 'id', order],
          [{ model: UserRelation }, 'createdAt', order],
          //['createdAt', order],['id', order]
        ] 
      }
    )
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }
}




// GET Client by ClientID and DieticianID
const getUserByClientIdAndDieticianId = async ( clientId, dieticianId, order ) => {
  User.hasOne(UserRelation, { foreignKey: 'clientId' });

  try {
    const users = await User.findOne(
      { 
        include : { 
          model:UserRelation,
          where: { 
            dieticianId:dieticianId,
            clientId: clientId,
            status:{
              [Op.or]: [ "invitation", "active" ]
            }
          } 
        }, 
        order: [
          [{ model: UserRelation }, 'id', order],
          [{ model: UserRelation }, 'createdAt', order],
          //['createdAt', order],['id', order]
        ] 
      }
    )
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }
}



// GET Client by ClientID
const getUserByClientId = async ( clientId, order ) => {
  try {
    const users = await User.findOne(
      { 
        include : { 
          model:UserRelation,
          where: { 
            clientId: clientId,
            status:{
              [Op.or]: [ "active" ]
            }
          } 
        }, 
        order: [
          [{ model: UserRelation }, 'id', order],
          [{ model: UserRelation }, 'createdAt', order],
          //['createdAt', order],['id', order]
        ] 
      }
    )
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }
}




// GET Relation by ClientID
const getRelation = async ( clientId ) => {
  try {
    const users = await UserRelation.findOne(
      { 
        where: { 
          clientId: clientId,
          status:"active"
        }
      }
    )
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }
}


const updateInvitation = async ( relationId, relation) => {
  //return {dieticianId, clientId,status}

  //return relation;
  return await UserRelation.update(
    relation,
      { where: { id: relationId } }
  );
}


/*

const getUserByEmail = async (pEmail) => {
  try {
    const user = await User.findOne({
      where: {
        email: pEmail
      }
    })
    return user;
  } catch (error) {
    throw new Error('error while getting users');
  }

}



const createUser = async (pUser) => {
  try {
    // Check if user with provided email already exists
    const existingUser = await User.findOne({ where: { email: pUser.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    // Create new user if email does not exist
    const newUser = await User.create(pUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const deleteUserById = async (pUserId) => {
  return await User.destroy({
    where: {
      id: pUserId
    }
  });
}


*/
export default {
  createInvitationToClient,
  
  getUsersByDieticianId,
  getUsersByClientId,

  getRelation,
  getUserByClientIdAndDieticianId,
  getUserByClientId,

  updateInvitation
  //getUsers,
  //getUserByEmail,
  //createUser,
  //deleteUserById
}