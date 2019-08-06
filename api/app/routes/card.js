import { Router } from 'express';
import Card from '../models/card';
import Clinic from '../models/clinic';
import ClinicDepartment from '../models/clinicDepartment';
import Doctor from '../models/doctor';


const cardRoutes = Router();

// get all cards
cardRoutes.get('/', async (req, res) => {
    const cards = await Card
      .find()
      .sort({_id: "desc"})
      .populate('cardType')
      .populate('clinic')
      .populate('clinicDepartment')
      .populate('doctor');

    res.send(cards);
});

// save new card
cardRoutes.post('/', async (req, res) => {
    const card = new Card;
    
    const r = req.body;
    
    card.complaint = r.complaint;
    card.diagnoses = r.diagnoses;
    card.materials = r.materials;
    card.prescriptions = r.prescriptions;
    card.notes = r.notes;
    card.cardType = r.cardType;

    if (r.clinic) {
        await Clinic.findOrCreate({
            title: r.clinic.title,
            address: r.clinic.address
        })
            .then(result => card.clinic = result.doc._id);
    
        if (r.clinicDepartment) {
            await ClinicDepartment.findOrCreate({
                title: r.clinicDepartment.title,
                address: r.clinicDepartment.address
            })
                .then(result => card.clinicDepartment = result.doc._id);
        }
    }
    
    if (r.doctor) {
        let doctor;

        // todo: save clinic on doctor.save()
        // if (typeof clinic != null) {
        //     doctor.clinic = clinic._id;
        // }
        
        await Doctor.findOrCreate({
            name: r.doctor.name,
            surname: r.doctor.surname
        }, {
            title: r.doctor.title
        })
            .then(result => doctor = result.doc);
        
        card.doctor = doctor._id;
    }
    
    await card.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving some-entity."});});
});

export default cardRoutes;