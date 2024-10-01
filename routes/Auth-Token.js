import { Router } from 'express';
import authByEmailPwd from '../helpers/authByEmailPwd.js';

const authTokenRouter = Router();

// Login with email and password
authTokenRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).send('Invalid');
    }

    try {
        const user = authByEmailPwd(email, password);

        return res.send(`User ${user.name} authenticated`);
    } catch (error) {
        return res.status(401).send(error.message);
    }
})

//Authenticated request with session to optain the user profile 

export default authTokenRouter;