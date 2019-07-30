import { Router } from 'express';
import Card from '../models/card';
// import CardType from '../models/cardType';

const cardRoutes = Router();

// get all elements
cardRoutes.get('/', async (req, res) => {
    const cards = await Card
      .find();
      // .populate('cardType');

    res.send(cards);
});
//
// // get element by id
// someEntityRoutes.get('/:id', async (req, res) => {
//     await SomeEntity.findById(req.params.id)
//         .then(data => {res.send(data);})
//         .catch(err => {res.status(500).send({message: err.message || "Some error occurred while getting some-entity."});});
// });

// save new element
cardRoutes.post('/', async (req, res) => {
    let card = new Card;
    const requestEntries = Object.entries(req.body);

    for (const [key, value] of requestEntries) {
        card[key] = value;
    }
    
    // let cardType = new CardType({
    //     'title': req.body.cardType.title
    // });
    // await cardType.save();
    // card.cardType = cardType;
    
    await card.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});});
});

// // update element
// someEntityRoutes.put('/', async (req, res) => {
//     let someEntityElement = {};
//
//     await SomeEntity.findById(req.body.id)
//         .then(data => {
//             someEntityElement = data;
//         }).catch(err => {res.status(500).send({message: err.message || "Some error occurred while getting some-entity."});});
//
//     const requestEntries = Object.entries(req.body);
//
//     for (const [key, value] of requestEntries) {
//         someEntityElement[key] = value;
//     }
//
//     await someEntityElement.save()
//         .then(data => {
//             res.send("Saved object:  " + data);
//         }).catch(err => {
//         res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});
//     });
// });
//
// // delete element
// someEntityRoutes.delete('/', async (req, res) => {
//     let someEntityElement = {};
//
//     await SomeEntity.findById(req.body.id)
//         .then(data => {
//             someEntityElement = data;
//         }).catch(err => {res.status(500).send({message: err.message || "Some error occurred while getting some-entity."});});
//
//
//     await someEntityElement.delete()
//         .then(data => {
//             res.send("Deleted.");
//         }).catch(err => {
//             res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});
//         });
// });

export default cardRoutes;