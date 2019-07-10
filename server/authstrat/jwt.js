const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const authSource = new FileAsync('./db/secure.json')

let opts = {};
let user = {};

low(authSource).then(db => {
    user = db.get('auth').value();
    console.log(user);
})

opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = 'SECRET_KEY'; //normally store this in process.env.secret

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.email === user.email) {
        return done(null, true)
    }
    return done(null, false)
})