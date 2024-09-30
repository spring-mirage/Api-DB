import { Router } from 'express';
import authByEmailPwd from '../helpers/authByEmailPwd.js';

const authRouter = Router();

// End point public no authenticated 
authRouter.get('/public', (req, res) => {
    res.status(200).send('Endpoint Public');
});

// End point private authenticated for user registered
authRouter.post('/authenticated', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const user = authByEmailPwd(email, password);
        return res.status(200).send(`User ${user.name} authenticated`);
    } catch (error) {
        return res.status(401).send('User not authenticated');
    }
})

// End point autorized to Admin
authRouter.post('/autorized', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const user = authByEmailPwd(email, password);

        if (user.role !== 'admin') {
            return res.status(403).send('User not autorized');
        }
        return res.status(200).send(`Admin User ${user.name} autorized`);
    } catch (error) {
        return res.status(401).send('User not autorized');
    }
        
        
});

export default authRouter;