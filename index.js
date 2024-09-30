import dotenv from 'dotenv';
import express from 'express';
import router from './routes/Router.js';
import authRouter from './routes/Auth.js';

dotenv.config();

const PORT = process.env.PORT || 6001;
const app = express();

app.use(express.json());
app.use(express.text());
app.use('/account', router);
app.use('/auth', authRouter);

app.get('/HomePage', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


