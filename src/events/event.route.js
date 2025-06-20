import express from 'express';
import {postAnEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from './event.controller.js';
const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', getEventById);

router.post('/create', postAnEvent);

router.patch('/edit/:id', updateEvent);

router.delete('/delete/:id', deleteEvent);


export default router;