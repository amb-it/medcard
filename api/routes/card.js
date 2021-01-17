import { Router } from 'express';
import Formidable from 'formidable';

import Card from '../models/card';
import Clinic from '../models/clinic';
import ClinicDepartment from '../models/clinicDepartment';
import Doctor from '../models/doctor';
import auth from '../middleware/auth';

//      ../cards/
const cardRoutes = Router();

// get all cards
cardRoutes.get('/', auth, async (req, res) => {
    const cards = await Card
      .find({
          user: req.user._id,
          deleted_at: {$exists: false}
      })
      .sort({_id: "desc"})
      .populate('cardType')
      .populate('clinic')
      .populate('clinicDepartment')
      .populate('doctor');

    res.send(cards);
});

// save new card
cardRoutes.post('/', auth, async (req, res) => {
    const r = req.body;
    let card;

    if (r.complaint) {
        card = await Card.findOne({
            complaint: r.complaint,
            user: req.user._id
        });

        if (card) {
            return res.status(400).send({message: 'Card with such complaint already exists'});
        }
    }

    card = new Card;
    
    card.complaint = r.complaint;
    card.diagnoses = r.diagnoses;
    card.materials = r.materials;
    card.prescriptions = r.prescriptions;
    card.notes = r.notes;
    card.cardType = r.cardType;
    card.files = r.files;

    card.user = req.user._id;

    if (r.clinicTitle) {
        
        const clinic = {title: r.clinicTitle};
        
        if (r.clinicAddress) {
            clinic.address = r.clinicAddress;
        }
        
        await Clinic.findOrCreate(clinic)
            .then(result => card.clinic = result.doc._id);
    
        if (r.clinicDepartmentTitle) {
            
            const clinicDepartment = {
                title: r.clinicDepartmentTitle
            };
            
            if (r.clinicDepartmentAddress) {
                clinicDepartment.address = r.clinicDepartmentAddress
            }
            
            await ClinicDepartment.findOrCreate(clinicDepartment)
                .then(result => card.clinicDepartment = result.doc._id);
        }
    }
    
    if (r.doctorSurname && r.doctorName) {
        await Doctor.findOrCreate({
            name: r.doctorName,
            surname: r.doctorSurname
        }, {
            title: r.doctorTitle
        })
            .then(result => card.doctor = result.doc._id);
    }
    
    await card.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});});
});

cardRoutes.get('/files', (req, res) => {
    res.redirect('/'+req.query.load);
});

cardRoutes.post('/files', (req, res) => {
    let filename;

    new Formidable.IncomingForm().parse(req)
        .on('fileBegin', (name, file) => {
            filename = Date.now() + '.' + file.name.substring(file.name.length - 3);
            file.path = __dirname + '/../user_files/sandbox/' + filename;
        })
        .on('file', (name, file) => {
            res.send({
                filename: filename
            });
        })
});

cardRoutes.delete('/:id', auth, async (req, res) => {
    let card = await Card.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    card.deleted_at = Date.now();

    await card.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while deleting card."});})
});

export default cardRoutes;