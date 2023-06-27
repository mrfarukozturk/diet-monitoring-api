import express from 'express';

import sendMail from './mail-sender.js';
//const fs = require('fs');

import userRelationRepository from '../repository/user-relation-repository.js'
import userRepository from '../repository/user-repository.js'

const router = express.Router();


// Create a new user
router.post('/', async (req, res, next) => {
  console.log( "Post isteği geldi." );
  try {
    const { email, authorId, dieticianId, clientId } = req.body;

    const newInvitationToClient = { dieticianId , email, authorId: dieticianId };
    let user = {};

    if ( dieticianId ){
      user = await userRelationRepository.createInvitationToClient(newInvitationToClient);
      if ( user ) {
        const dietician = await userRepository.getUserById(dieticianId)
        await sendMail( {
          from:dietician.firstName + " " + dietician.lastName + ` from DIET MONITORING <hicoders_hrms@zohomail.eu>`,
          to: email,
          subject: dietician.firstName + " " + dietician.lastName + ' invited you to follow the diet.',
          html: {
            templateName:"invite.html",
            params: {
              mail: email,
              dieticianName: dietician.firstName + " " + dietician.lastName,
              dieticianImg: dietician.profileImage
            }
          }
        });
      }

    }else if ( clientId ){
      //user = await userRelationRepository.createInvitationToClient(newInvitationToClient);        
    }

    return res.status(201).send(user);
  } catch (error) {
    //return res.status(400).send(error.name)
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Invalid user input' });
    } else if (error.message === 'User with this email already exists') {
      return next({ message: 'A user with this email already exists' });
    } else {
      return next(error);
    }
  }
});

// Get all users
router.get('/', async (req, res) => {
    //const clientId = req.query.clientId; // /?userId=something
  const dieticianId = req.query.dieticianId; // /?userId=something
  const clientId = req.query.clientId;
  const order = req.query.order ?  req.query.order: "asc"; // Get order from query parameter

  //return res.status(200).send({asdsad:"sadsad"});
  try {
    let users;
    if ( dieticianId && clientId ) {
      users = await userRelationRepository.getUserByClientIdAndDieticianId( clientId, dieticianId, order );
    }
    else if ( dieticianId ) {
      
      users = await userRelationRepository.getUsersByDieticianId( dieticianId, order );
    }
    else if ( clientId ) {
      //users = clientId
      users = await userRelationRepository.getUsersByClientId( clientId, order );
    }
      return res.status(200).send(users);
  } catch (error) {
      return res.status(500).send({ message: 'Error fetching users' });
  }
});

// Get client with relation
router.get('/client', async (req, res) => {

    //const clientId = req.query.clientId; // /?userId=something
    const dieticianId = req.query.dieticianId; // /?userId=something
    const clientId = req.query.clientId;
    const order = req.query.order ?  req.query.order: "asc"; // Get order from query parameter

  //return res.status(200).send({asdsad:"sadsad"});
  try {
    let users;
    users = await userRelationRepository.getUserByClientId( clientId, order );
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Error fetching users' });
  }
});

// Get client with relation
router.get('/relation', async (req, res) => {

  //const clientId = req.query.clientId; // /?userId=something
  const clientId = req.query.clientId;
  //return res.status(200).send({asdsad:"sadsad"});
  try {
    let users;
    users = await userRelationRepository.getRelation( clientId );
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Error fetching users' });
  }
});

// Update Relation
router.put('/relation/:id', async (req, res) => {
  const { id } = req.params
  const updatedRelation = req.body
  const relation = await userRelationRepository.updateInvitation(id, updatedRelation)
  return res.status(200).send( relation );
});


export default router;