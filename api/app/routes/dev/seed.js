import { Router } from 'express';
import cardTypeSeed from '../../seeds/cardTypeSeed';
import CardType from '../../models/cardType';


const seedRoutes = Router();


seedRoutes.post('/', async (req, res) => {
  
  // delete data from cardType collection
  await CardType.deleteMany({});
  await CardType._resetCount();
  
  // save cardTypes from seed array
  for (const value of cardTypeSeed) {
    const cardType = new CardType({
      "title": value.title
    });
    
    await cardType.save()
      .catch(err => {res.send({message: err.message});});
  }
  
  res.send({"result": "success"});
});

export default seedRoutes;
