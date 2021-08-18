import { Router } from 'express';
import Formidable from 'formidable';

import {Card} from '../models/card';
import User from "../models/user";
import Clinic from '../models/clinic';
import ClinicDepartment from '../models/clinicDepartment';
import Doctor from '../models/doctor';
import auth from '../middleware/auth';

//      ../cards/
const cardRoutes = Router();

// get all cards
cardRoutes.get('/', auth, async (req, res) => {
    let user_id = req.user._id;

    let user = await User.findOne({
        _id: user_id
    })
    .populate('cards.cardType')
    .populate('cards.clinic')
    .populate('cards.clinicDepartment')
    .populate('cards.doctor');

    const cards = user.cards
        .filter(card => !card.deleted_at)
        .sort((a, b) => a.date < b.date ? 1 : -1)

    res.send(cards);
});

// save new card
cardRoutes.post('/', auth, async (req, res) => {
    const r = req.body;

    let user = req.user;

    if (user.cards === undefined) {
        user.cards = [];
    }

    let card = new Card;

    card._id = user.cards.length + 1;

    card.complaint = r.complaint;
    card.diagnoses = r.diagnoses;
    card.materials = r.materials;
    card.prescriptions = r.prescriptions;
    card.notes = r.notes;
    card.cardType = r.cardType;
    card.tags = r.tags;
    card.files = r.files;

    if (r.date) {
        card.date = r.date;
    }

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

    user.cards.push(card);

    await user.save()
        .then(data => {res.send(card);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving new card."});});
});

// edit card
cardRoutes.put('/:id', auth, async (req, res) => {
    const r = req.body;

    let user = req.user;

    let card = user.cards.id(req.params.id);

    card.complaint = r.complaint;
    card.diagnoses = r.diagnoses;
    card.materials = r.materials;
    card.prescriptions = r.prescriptions;
    card.notes = r.notes;
    card.cardType = r.cardType;
    card.tags = r.tags;
    card.files = r.files;

    if (r.date) {
        card.date = r.date;
    }

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

    await user.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while saving edited card."});});
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
    let user = req.user;

    let card = user.cards.id(req.params.id);

    card.deleted_at = Date.now();

    await user.save()
        .then(data => {res.send(data);})
        .catch(err => {res.status(500).send({message: err.message || "Some error occurred while deleting card."});})
});

export default cardRoutes;