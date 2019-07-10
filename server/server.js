    
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const app = express();


app.use(express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const adapter = new FileAsync('./db/data.json')
low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id

    app.get('/posts', (req, res) => {
        const post = db.get('posts')
          .value()
        res.send(post)
      })

    app.get('/posts/:id', (req, res) => {
        const post = db.get('posts')
          .find({ id: req.params.id })
          .value()
  
        res.send(post)
      })

    app.get('/posts/:id', (req, res) => {
      const post = db.get('posts')
        .find({ id: req.params.id })
        .value()

      res.send(post)
    })

    // POST /posts
    app.post('/posts', (req, res) => {
      db.get('posts')
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(post => res.send(post))
    })

    // Set db default values
    return db.defaults({ posts: [] }).write()
  })
//   .then(() => {
//     app.listen(3000, () => console.log('listening on port 3000'))
//   })



const port = process.env.PORT || 4200;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));