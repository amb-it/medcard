import { Router } from 'express';

import Card from "../models/card";
import auth from '../middleware/auth';

//      ../tags
const tagRoutes = Router();

tagRoutes.get('/', auth, async (req, res) => {
    const cards = await Card
        .find({
            user: req.user._id,
            deleted_at: {$exists: false}
        });

    let tags = [];

    cards.forEach(function(card) {
        if (card.tags.length > 1) {
            tags.push(...card.tags);
        }
    });

    tags.sort();

    tags = [...new Set(tags)]; // leave only unique values

    res.send(tags);
});

export default tagRoutes;