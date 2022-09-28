const Sauce = require('../models/Sauce');
const auth = require('../middleware/auth');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    console.log(req.body);
    console.log(req.body.sauce);
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Saisie incorrecte' });
    }
    const sauceObjet = JSON.parse(req.body.sauce);
    console.log(sauceObjet);
    console.log(req.auth.userId);
    delete sauceObjet._id;
    delete sauceObjet.userId;
    const sauce = new Sauce({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce);
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) });
};

exports.GetOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObjet = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObjet.userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                if (req.file) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) console.log(err);
                    });
                }

                Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            let like = req.body.like
            switch (like) {
                case 1:
                    sauce.likes += 1;
                    sauce.usersLiked.push(req.body.userId);
                    // console.log(sauce);
                    sauce.save();
                    res.status(200).json({ message: 'Like enregistré' });
                    break;
                case 0:
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        sauce.likes -= 1;
                        sauce.usersLiked = sauce.usersLiked.filter(user => user === !req.body.userId);
                        // console.log(sauce);
                        sauce.save();
                        res.status(200).json({ message: 'Like annulé' });
                    } else {
                        sauce.dislikes -= 1;
                        sauce.usersDisliked = sauce.usersDisliked.filter(user => user === !req.body.userId);
                        // console.log(sauce);
                        sauce.save();
                        res.status(200).json({ message: 'Dislike annulé' });
                    }
                    break;
                case -1:
                    sauce.dislikes += 1;
                    sauce.usersDisliked.push(req.body.userId);
                    // console.log(sauce);
                    sauce.save();
                    res.status(200).json({ message: 'Dislike enregistré' });
                    break;
            }
        })
        .catch(error => res.status(401).json({ error }));
};

