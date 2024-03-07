const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Products = require('./../Models/products');
const Potions = require('./../Models/potions');
const Ingredients = require('./../Models/ingredients');
const User = require('../Models/users');
const {Op} = Sequelize;
const bcrypt = require('bcrypt');

// -------------------------------------------------------------------------------------
// Get all products and adds a filter from the query to filter the results
router.get('/products', (req, res) => {
    let filter = {};
    let {q} = req.query;
    
    if (q) {
        filter = {
            where: {
                name: {
                    [Op.like]: `${q}%`
                }
            }
        }
    }

    Products.findAll(filter).then(products => {
        res.json(products);
    });
});

// Retrieve the id from the params of the request and find the matching product
router.get('/product/:id', (req, res) => {
    let {id} = req.params;
    Products.findByPk(id).then(product => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).send(`Cannot find GET of id: ${id}`);
        }
    });
});

// -------------------------------------------------------------------------------------
    //Get all potions with the filter from the query
router.get('/potions', (req, res) => {
    let filter = {};
    let {q} = req.query;

    if (q) {
        filter = {
            where: {
                name: {
                    [Op.like]: `${q}%`
                }
            }
        }
    }

    Potions.findAll(filter).then(potions => {
        res.json(potions);
    });
});

    // Get the ID from the url and returns the matching potion
router.get('/potions/:id', (req, res) => {
    let {id} = req.params;

    Potions.findByPk(id).then(potion => {
        if (potion) {
            res.json(potion);
        } else {
            res.status(404).send();
        }
    });
});


// -------------------------------------------------------------------------------------
    // Get all ingredients with an optional filter
    router.get('/ingredients', (req, res) => {
        let filter = {};
        let {q} = req.query;
    
        if (q) {
            filter = {
                where: {
                    name: {
                        [Op.like]: `${q}%`
                    }
                }
            }
        }
    
        Ingredients.findAll(filter).then(ingredients => {
            res.json(ingredients);
        });
    });
    
        // Get the ID from the url and returns the matching ingredient
    router.get('/ingredients/:id', (req, res) => {
        let {id} = req.params;
    
        Ingredients.findByPk(id).then(ingredient => {
            if (ingredient) {
                res.json(ingredient);
            } else {
                res.status(404).send();
            }
        });
    });


// -------------------------------------------------------------------------------------
    // Login page
router.get('/login', (req, res) => {
    // res.render('../../Components/User/login');
    res.render('src/Components/User/login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureMessage: true}), (req, res) => {
    res.redirect('/profile' + req.user);
});

    // Get the current user by ID
router.get('/profile/:id', (req, res) => {
    let {id} = req.params;

    User.findByPk(id).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).send();
        }
    });
});


// -------------------------------------------------------------------------------------
    // Register a new user
router.post('/register', async (req, res) => {
    console.log(req.body);
    const {email, username, password} = req.body;

    try {
        // Check if user already exist
        const possibleUser = await User.findOne({
            attributes: ['username', 'email'],
            where: {
                [Op.or]: {
                    email: email,
                    username: username
                }
            }
        });
        if (possibleUser) {
            // res.write('User already exists');
            res.redirect('login');
            return
        }

        // Secures the password
        let saltRound = 4;
        let salt = await bcrypt.genSalt(saltRound);
        let hashedPw = await bcrypt.hash(password, salt);
        let currentDate = new Date();
        let d = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

        const newUser = User.create({
            username: username,
            email: email,
            password: hashedPw,
            createdAt: d
        });

        res.redirect('login');
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get('/register', (req, res) => {
    res.send('render');
});

module.exports = router;