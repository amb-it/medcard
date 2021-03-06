import { Router } from 'express';
import CardType from '../models/cardType';

//      ../card-types
const cardTypeRoutes = Router();

cardTypeRoutes.get('/', async (req, res) => {
    const cardTypes = await CardType
      .find();
    
    res.send(cardTypes);
});

export default cardTypeRoutes;