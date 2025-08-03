import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();



  router.get('/user/:id', async (req, res) => {
    try {
      const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
      return res.status(200).send(user)
    } catch (err) {
      return res.status(404).send('User not found')
    }
  })
