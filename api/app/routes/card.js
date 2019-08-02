import { Router } from 'express';
import Card from '../models/card';


const cardRoutes = Router();

// get all cards
cardRoutes.get('/', async (req, res) => {
    const cards = await Card
      .find()
      .sort({_id: "desc"})
      .populate('cardType');

    res.send(cards);
});

// save new card
cardRoutes.post('/', async (req, res) => {
    let card = new Card;
    const requestEntries = Object.entries(req.body);
    
    for (const [key, value] of requestEntries) {
        card[key] = value;
    }
    
    await card.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});});
});

export default cardRoutes;