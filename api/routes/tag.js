import { Router } from 'express';

import auth from '../middleware/auth';

//      ../tags
const tagRoutes = Router();

tagRoutes.get('/', auth, async (req, res) => {
    const cards = req.user.cards;

    let tags = [];

    cards.forEach(function(card) {
        if (card.tags.length > 0) {
            tags.push(...card.tags);
        }
    });

    tags.sort();

    tags = [...new Set(tags)]; // leave only unique values

    res.send(tags);
});

export default tagRoutes;