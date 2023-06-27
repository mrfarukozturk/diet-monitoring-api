import express from 'express';
import consultationRepository from '../repository/consultation-repository.js';
import puppeteer from 'puppeteer'
const router = express.Router();



router.get('/', async (req, res, next) => {
   try {
      const clientId = req.query.clientId; // /?userId=something
      const dieticianId = req.query.dieticienId; // /?userId=something

      const order = req.query.order ?  req.query.order: "asc"; // Get order from query parameter
      let consultations;
      if (clientId) {
         consultations = await consultationRepository.getConsultationsByClientId(clientId, order);
      }else if (dieticianId) {
         consultations = await consultationRepository.getConsultationsByDieticienId(dieticianId, order);
      }      
      return res.status(200).send(consultations);
   } catch (error) {
      return next({ status: 404, message: error });
   }
});



// Create a new post
router.post('/', async (req, res, next) => {
   try {
      const { body } = req;
      console.log(body)
      const newConsultation = await consultationRepository.createConsultation(body);
      return res.send(newConsultation);
   } catch (error) {
      return next({ status: 500, message: error.message });
   }
});

/*
// Get a single post by id
router.get('/:id', async (req, res, next) => {
   try {
      const postId = req.params.id
      const selectedPost = await postRepository.getPostById(postId);
      if (selectedPost === null) return next({ status: 404, message: `post with id  ${postId} not found` })
      return res.status(200).send(selectedPost);
   } catch (err) {
      return next({ status: 500, message: err.message });
   }
});;
*/


// Update a post by id
router.put('/:id', async (req, res) => {
   const { id } = req.params
   const updatedConsultation = req.body
   const consultation = await consultationRepository.updateConsultationById(id, updatedConsultation)
   return res.status(200).send(consultation);
});;




// Delete a post by id
router.delete('/:id', async (req, res) => {
   const result = await consultationRepository.deleteConsultationById(req.params.id);
   if (result === 0) {
      return res.status(404).send(`Can't delete consultation ${req.params.id} because it doesn't even exist :)`);
   } else {
      return res.send(`Consultation ${req.params.id} deleted`);
   }
});
/**/

export default router;
