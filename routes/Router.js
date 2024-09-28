import express from 'express';
import { USER_DDBB } from '../bbdd.js';

const router = express.Router();

router.use((req, res, next) => {
    console.log(req.ip);
    next();
});

router.get('/', (req, res) => {
    return res.send('User section');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = USER_DDBB.find((user) => user.id === id);
    if (user) {
        return res.send(user);
    } else {
        return res.status(404).send('User not found');
    }
});

//create a new accound from the id and name
router.post('/', (req, res) => {
    const { id, name } = req.body;

    if(!id || !name) {
        return res.status(400).send('Params is required');
    }

    const user = USER_DDBB.find((user) => user.id === id);


    if (user) {
        return res.status(409).send('User already exists');
    } else {
        USER_DDBB.push({ id, name });
        return res.status(201).send('User created');
    }
});

//update the name of the account
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if(!name) {
        return res.status(400).send('Name is required');
    }

    const user = USER_DDBB.find((user) =>  user.id === id);

    if (!user) {
        return res.status(404).send('User not found');
    } else {
        user.name = name;
        return res.status(200).send('User updated');
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = USER_DDBB.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        res.status(404).send('User not found');
    } else {
        USER_DDBB.splice(userIndex, 1);
        res.status(200).send('User deleted');
    }
});

export default router;