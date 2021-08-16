import { Router } from 'express';
import clearCollections from '../../controllers/dev/clearCollections';
import cardTypeSeed from '../../controllers/dev/seed/cardTypeSeed';


const devRoutes = Router();

devRoutes.post('/db/refresh', async (req, res) => {

    if (process.env.ENV !== 'prod') {
        await clearCollections(
            [
                'users',
                'cards',
                'cardtypes',
                'clinics',
                'clinicdepartments',
                'doctors',
                'idcounters'
            ]
        );
        await cardTypeSeed();

        res.send({"result": "success"});
    }

    res.send({"result": "not allowed"});
});

export default devRoutes;
