const express = require('express'); 
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Products = require('./../Models/products');
const Potions = require('./../Models/potions');
const Ingredients = require('./../Models/ingredients');
const User = require('./../Models/users');
const {Op} = Sequelize;
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const store = session.MemoryStore();

app.use(session({
    secret: 'advsuppBabyyyy',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000*60*60*3, // Cookie last 3h
        sameSite: 'none'
    },
    store
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    const user = req.user || 'Guest';
    res.render('home', {user});
});

// -------------------------------------------------------------------------------------
// Get all products and adds a filter from the query to filter the results
app.get('/products', (req, res) => {
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
app.get('/product/:id', (req, res) => {
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
app.get('/potions', (req, res) => {
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
app.get('/potions/:id', (req, res) => {
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
    app.get('/ingredients', (req, res) => {
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
    app.get('/ingredients/:id', (req, res) => {
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
app.get('/login', (req, res) => {
    res.render('/login')
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureMessage: true}), (req, res) => {
    res.redirect('/profile' + req.user);
});

    // Get the current user by ID
app.get('/profile/:id', (req, res) => {
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
app.get('/register', async (req, res) => {
    const {email, username, password} = req.body;

    try {
        // Check if user already exist
        const possibleUser = User.findOne({
            where: {
                email: email,
                username: username
            }
        });
        if (possibleUser) {
            console.log('user already exist');
            res.redirect('login');
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
    } catch {

    }
});


app.listen(PORT, () => {
    console.log(`connected correctly to server at port ${PORT}`);
})