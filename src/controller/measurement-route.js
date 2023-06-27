import express from 'express';
import measurementRepository from '../repository/measurement-repository.js';
import puppeteer from 'puppeteer'
const router = express.Router();



router.get('/', async (req, res, next) => {
   try {
      const clientId = req.query.clientId; // /?userId=something
      const order = req.query.order ?  req.query.order: "asc"; // Get order from query parameter
      let measurements;
      if (clientId) {
         measurements = await measurementRepository.getMeasurementsByClientId(clientId, order);
      }
      return res.status(200).send(measurements);
   } catch (error) {
      return next({ status: 404, message: error });
   }
});



// Create a new post
router.post('/', async (req, res, next) => {
   try {
      const { body } = req;
      const newMeasurement = await measurementRepository.createMeasurement(body);
      return res.send(newMeasurement);
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
   const updatedMeasurement = req.body
   const measurement = await measurementRepository.updateMeasurementById(id, updatedMeasurement)
   return res.status(200).send(measurement);
});;




// Delete a post by id
router.delete('/:id', async (req, res) => {
   const result = await measurementRepository.deleteMeasurementById(req.params.id);
   if (result === 0) {
      return res.status(404).send(`Can't delete measurement ${req.params.id} because it doesn't even exist :)`);
   } else {
      return res.send(`Measurement ${req.params.id} deleted`);
   }
});
/**/

export default router;
