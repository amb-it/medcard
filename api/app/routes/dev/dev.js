import { Router } from 'express';
import clearDb from '../../controllers/dev/cleardb';
import cardTypeSeed from '../../controllers/dev/seed/cardTypeSeed';


const devRoutes = Router();

devRoutes.post('/db/refresh', async (req, res) => {
    
    await clearDb();
    await cardTypeSeed();
    
    res.send({"result": "success"});
});

export default devRoutes;
