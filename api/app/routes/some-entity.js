import { Router } from 'express';
import SomeEntity from '../models/some-entity';

const someEntityRoutes = Router();

// get all elements
someEntityRoutes.get('/', async (req, res) => {
    const someEntities = await SomeEntity.find();
    res.send(someEntities);
});

// get element by id
someEntityRoutes.get('/:id', async (req, res) => {
    await SomeEntity.findById(req.params.id)
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while getting some-entity."});});
});

// save new element
someEntityRoutes.post('/', async (req, res) => {
    let someEntityElement = new SomeEntity;
    const requestEntries = Object.entries(req.body);

    for (const [key, value] of requestEntries) {
        someEntityElement[key] = value;
    }

    someEntityElement.save()
        .then(data => {res.send("Saved object:  " + data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});});
});

// update element
someEntityRoutes.put('/', async (req, res) => {
    let someEntityElement = {};

    await SomeEntity.findById(req.body.id)
        .then(data => {
            someEntityElement = data;
        }).catch(err => {res.status(500).send({message: err.message || "Some error occurred while getting some-entity."});});

    const requestEntries = Object.entries(req.body);

    for (const [key, value] of requestEntries) {
        someEntityElement[key] = value;
    }

    await someEntityElement.save()
        .then(data => {
            res.send("Saved object:  " + data);
        }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});
    });
});

// delete element
someEntityRoutes.delete('/', async (req, res) => {
    let someEntityElement = {};

    await SomeEntity.findById(req.body.id)
        .then(data => {
            someEntityElement = data;
        }).catch(err => {res.status(500).send({message: err.message || "Some error occurred while getting some-entity."});});


    await someEntityElement.delete()
        .then(data => {
            res.send("Deleted.");
        }).catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});
        });
});

export default someEntityRoutes;