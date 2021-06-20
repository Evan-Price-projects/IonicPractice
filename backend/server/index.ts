import express from 'express';
import bcrypt from "bcrypt";
import { MongoClient, Db } from 'mongodb';
import { find } from 'shelljs';
import jwt from 'jsonwebtoken';
import { access } from 'fs-extra';

// rest of the code remains same
const app = express();
const PORT = 8000;

class User {
  _id!: string;
  name?: string;
  password!: string;
  email!: string;
  photo?: any;
}
const withDB = async (operations:any, res:any) => {
  try {
      const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
      const db = client.db('game');
      await operations(db);

      client.close();
  }
  catch (err) {
      res.status(500).json({ message: "error connecting to db", err });
  }
}

app.use(express.json())

app.get('/api/register/new', async (req, res) => {
    withDB(async (db:Db) => {
        var x = new User()
        x._id = Math.random().toString(36).substr(2, 9);
        x.name = '';
        x.email = '';
        x.password = '';
        res.status(200).json(x);
    },res)
})

app.get('/api/login/:id', async (req, res) => {
  withDB(async (db:Db) => {
    const user = await db.collection('user').findOne({ name: req.params.id })
    console.log('user',user)
      res.status(200).json(user);
  },res)
})

app.get('/api/:id', async (req, res) => {
  console.log(req.params.id)
  withDB(async (db:Db) => {
      const updatedArticleInfo = await db.collection('user').find({ name: req.params.id }).toArray();
      console.log(updatedArticleInfo);
      res.status(200).json(updatedArticleInfo)
  },res)
})

app.put('/api/:id', async (req, res) => {
  console.log(req.body, req)
  var login = req.body;
/*   withDB(async (db:Db) => {
      var updatedArticleInfo = await db.collection('user').findOneAndUpdate({ _id: login['_id'] },{})
      res.status(200).json(updatedArticleInfo)
  },res) */
})

app.post('/api/register', async (req, res) => {
  var login:User = req.body.user;
  console.log(login)
  const salt = await bcrypt.genSalt(10);
  login.password = await bcrypt .hash(login.password, salt);
  withDB(async (db:Db) => {
      db.collection('user').insertOne(login);
      const updatedArticleInfo = await db.collection('user').findOne({ name: login['name'] })
      res.status(200).json(updatedArticleInfo)
  },res)
})

app.post('/api/login', async (req, res)=>{
  const body:User = req.body.user;
  console.log(body)
  withDB(async (db:Db) => {
  const user = await db.collection('user').findOne({ name: body.name });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      const accessToken = jwt.sign({ email: user.email,  name: user.name }, 'secret');
      res.status(200).json({accessToken,body});
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
  },res)
})

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
  