import { Router } from 'express';
import authByEmailPwd from '../helpers/authByEmailPwd.js';
import { SignJWT, jwtVerify } from 'jose';
import { USER_DDBB } from '../bbdd.js';
import validateLoginDTO from '../DTO/validate-login-dto.js';

const authTokenRouter = Router();

// Login with email and password
authTokenRouter.post('/login', validateLoginDTO, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Invalid');
    }

    try {
        const {id} = authByEmailPwd(email, password);

        //Generate Token and return
        const jwtConstructor = new SignJWT({ id });

        const encoder = new TextEncoder();
        const jwt = await jwtConstructor.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_SECRET));

        return res.send({ jwt });
    } catch (error) {
        return res.status(401).send(error.message);
    }
})

//Authenticated request with session to optain the user profile 
authTokenRouter.get('/profile', async (req, res) => {
    //Obtain token from header and verify authenticity and expiration
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('Token not found');
    }

    try {
        const encoder = new TextEncoder();
        const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_SECRET));
        
        const user = USER_DDBB.find((user) => user.id === payload.id);
        
        if (!user) {
            res.status(401).send('User not found');
        }

        delete user.password;

        return res.send(user);
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
})

export default authTokenRouter;