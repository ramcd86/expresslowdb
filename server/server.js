
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const jwt = require("jsonwebtoken");
const strat = require("./authstrat/jwt");
const authSource = new FileAsync('./db/secure.json');
const archetypes = new FileAsync('./db/archetypes.json');
const adapter = new FileAsync('./db/data.json');


passport.use(strat);



const app = express();

let user = {};

app.use(express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  let {
    email,
    password
  } = req.body;
  console.log(user)
  console.log(req.body);
  if (email === user.email) {
    if (password === user.password) { //the password compare would normally be done using bcrypt.
      // opts.expiresIn = 86400;  //token expires in 1 day
      const localOpts = {
        expiresIn: 86400
      }
      const secret = "SECRET_KEY" //normally stored in process.env.secret
      const token = jwt.sign({
        email
      }, secret, localOpts);
      return res.status(200).json({
        message: "Auth Passed",
        token
      })
    }
  }
  return res.status(401).json({
    message: "Auth Failed"
  })
});


app.get("/protected", passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log(req, res)
  return res.status(200).send("YAY! this is a protected Route")
})

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'SECRET_KEY'; //normally store this in process.env.secret

// module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
//     if (jwt_payload.email === user.email) {
//         return done(null, true)
//     }
//     return done(null, false)
// }) 



low(archetypes).then(arc => {
  app.get('/archetypes', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const post = arc.get('archetypes')
      .value()
    res.send(post)
  })
})


low(authSource).then(db => {
  user = db.get('auth').value();
  console.log(user);
})

low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id

    app.get('/posts', passport.authenticate('jwt', {
      session: false
    }), (req, res) => {
      const post = db.get('posts')
        .value()
      res.send(post)
    })

    app.get('/posts/:id', (req, res) => {
      const post = db.get('posts')
        .find({
          id: req.params.id
        })
        .value()

      res.send(post)
    })

    app.get('/posts/:id', (req, res) => {
      const post = db.get('posts')
        .find({
          id: req.params.id
        })
        .value()

      res.send(post)
    })

    // POST /posts
    app.post('/posts', (req, res) => {
      db.get('posts')
        .push(req.body)
        .last()
        .assign({
          id: Date.now().toString()
        })
        .write()
        .then(post => res.send(post))
    })

    // Set db default values
    return db.defaults({
      posts: []
    }).write()
  })


const port = process.env.PORT || 4200;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));