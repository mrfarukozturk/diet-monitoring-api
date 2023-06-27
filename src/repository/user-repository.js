import User from "../model/user-model.js"

const getUsers = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }

}


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


const getUserById = async (pId) => {
  try {
    const user = await User.findOne({
      where: {
        id: pId
      }
    })
    return user;
  } catch (error) {
    throw new Error('error while getting users');
  }

}



const getUserByClientId = async (clientId) => {
  try {
    const user = await User.findOne({
      where: {
        id: clientId
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


const updateUserById = async (uId, updatedUser) => {
  try {

    await User.update(updatedUser, { where: { id: uId } });
    return

  } catch (error) {
      console.log(error);
  }
}

const deleteUserById = async (pUserId) => {
  return await User.destroy({
    where: {
      id: pUserId
    }
  });
}



export default {
  getUsers,
  getUserByEmail,
  getUserById,
  getUserByClientId,
  createUser,
  updateUserById,
  deleteUserById
}