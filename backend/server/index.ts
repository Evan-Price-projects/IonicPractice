import express from 'express';
import bcrypt from "bcrypt";
import { MongoClient, Db } from 'mongodb';
import { find } from 'shelljs';

// rest of the code remains same
const app = express();
const PORT = 8000;

class User {
  _id!: string;
  name!: string;
  password!: string;
  email!: string;
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

app.get('/api/login/new', async (req, res) => {
    withDB(async (db:Db) => {
        var x = new User()
        x._id = Math.random().toString(36).substr(2, 9);
        x.name = '';
        x.email = '';
        x.password = '';
        res.status(200).json(x);
    },res)
})

app.post('/api/login', async (req, res) => {
  var login:User = JSON.parse(req.body.body);
  const salt = await bcrypt.genSalt(10);
  login.password = await bcrypt .hash(login.password, salt);
  withDB(async (db:Db) => {
      db.collection('user').insertOne(login);
      const updatedArticleInfo = await db.collection('user').findOne({ _id: login['_id'] })
      res.status(200).json(updatedArticleInfo)
  },res)
})
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
  });

