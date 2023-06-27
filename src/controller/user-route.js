import express from 'express';
import nodemailer from 'nodemailer'
import userRepository from '../repository/user-repository.js'

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {

    //return res.status(200).send({asdsad:"sadsad"});
  
    try {
        const users = await userRepository.getUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: 'Error fetching users' });
    }
});



// Get profile by mail
router.get('/profile/:email',  async (req, res) => {
  
  try {
    const userEmail = req.params.email
    const user = await userRepository.getUserByEmail(userEmail);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Error fetching users' });
  }
});





// Create a new user
router.post('/', async (req, res, next) => {
  console.log(req.body)
  //return res.status(201).send(req.body);

  try {
    const { email, firstName, lastName, birthday,role,profileImage } = req.body;
    const newUser = { firstName, email, lastName, birthday,role,profileImage };
    const user = await userRepository.createUser(newUser);

    console.log(user);
    await notifyUser(user.email);
    return res.status(201).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Invalid user input' });
    } else if (error.message === 'User with this email already exists') {
      return next({ message: 'A user with this email already exists' });
    } else {
      return next(error);
    }
  }
});


// Update a user by id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedUser = req.body
  const post = await userRepository.updateUserById(id, updatedUser)
  return res.status(200).send(post);
});


// Delete a users by id
router.delete('/:id', async(req, res,next) => {
  try {
      const {id} = req.params
      const user = await userRepository.deleteUserById(id);
      if (!user) {
          return next({status:404, message: 'User' + id + ' does not exist'});
      }
      res.send(`user with the id ${id} deleted`)
  } catch (err) {
      console.error(err);
      next({status:404, message: `failed to delete user ${id}`});
  }
});;
async function notifyUser(pEmail) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
            user: 'hicoders_hrms@zohomail.eu',
            pass: "MysHH3h!zwjSex!"
        }
    });

    const info = await transporter.sendMail({
        from: 'hicoders_hrms@zohomail.eu',
        to: pEmail,
        subject: 'Notification',
        text: 'welcome to Bloggy!!'
    });

    console.log('Message sent: %s', info.messageId);
    return info;
}
export default router;