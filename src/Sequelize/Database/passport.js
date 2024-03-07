
const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/users');

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
        where: {
            username: username
        }
    }).then(async user => {
        console.log(user);
        if (!user) return done(null, false);
        const matchedPw = await bCrypt.compare(password, user.password);
        if (matchedPw) return done(null, false);
        done(user);
    }).catch(err => {
        done(err);
    });
}));

passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        username: user.username,
        email: user.email
    });
});

passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
        done(null, user);
    }).catch(err => {
        done(err);
    });
});
