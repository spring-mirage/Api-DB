import { Router } from 'express';
import { nanoid } from 'nanoid';
import authByEmailPwd from '../helpers/authByEmailPwd.js';
import { USER_DDBB } from '../bbdd.js';

const sessions = [];

const authSessionRouter = Router();

//Login With email and password
authSessionRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Invalid');
    }

    try {
        const {id} = authByEmailPwd(email, password);

        const sessionId = nanoid();
        sessions.push({ sessionId, id });

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
        });
        res.status(200).send(`User authenticated`);
    } catch (error) {
        return res.status(401).send(error.message);
    }
});

//Authenticate request with Session to obtain user profile
authSessionRouter.get('/profile', (req, res) => {
    const { cookies } = req;
    if (!cookies.sessionId) {
        return res.status(401).send('No session');
    }

    const userSession = sessions.find((session)=> session.sessionId === cookies.sessionId);
    
    if (!userSession) {
        return res.status(401).send('Invalid session');
    }

    const user = USER_DDBB.find(user => user.id === userSession.id);

    if (!user) {
        res.status(401).send('User not found');
    }

    delete user.password;

    return res.send(user);
})

export default authSessionRouter;