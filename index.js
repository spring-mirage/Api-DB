import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import accountRouter from './routes/Account.js';
import authRouter from './routes/Auth.js';
import authSessionRouter from './routes/Auth-Session.js';
import authTokenRouter from './routes/Auth-Token.js';

dotenv.config();

const PORT = process.env.PORT || 6001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use('/account', accountRouter);
app.use('/auth', authRouter);
app.use('/auth-token', authTokenRouter)
app.use('/auth-session',authSessionRouter)

app.get('/HomePage', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


