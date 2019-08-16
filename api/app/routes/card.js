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
    const r = req.body;
    
    let card = await Card.findOne({complaint: r.complaint});
    
    if (card) {
        return res.status(500).send({message: 'Card with such complaint already exists'});
    }

    card = new Card;
    
    card.complaint = r.complaint;
    card.diagnoses = r.diagnoses;
    card.materials = r.materials;
    card.prescriptions = r.prescriptions;
    card.notes = r.notes;
    card.cardType = r.cardType;

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

export default cardRoutes;