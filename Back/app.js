const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const sauceRoutes = require('./routes/sauceRoutes');

dotenv.config({ path: './config.env' });
const dataBase = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(dataBase,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
//     next();
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.post('/api/sauces', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({ message: 'Objet crée !' });
//     next();
// });



// app.get('/api/sauces', (req, res, next) => {
//     const sauces = [
//         {
//             userId: 1,
//             name: 'coktail',
//             manufacturer: 'DL'
//         },
//         {
//             userId: 2,
//             name: 'mayonnaise',
//             manufacturer: 'amora'
//         }
//     ];
//     res.status(200).json(sauces);
// });



module.exports = app;
