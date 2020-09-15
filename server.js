const express = require('express');
const server = express();
const actionRouter = require('./data/actionRouter');
const projectRouter = require('./data/projectRouter');

server.use(express.json())
server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);
const db = require('./data/db.js')

server.get('/', async (req, res) => {
    try {
      const shoutouts = await db('shoutouts');
      const messageOfTheDay = process.env.MOTD || 'Hello World!';
      res.status(200).json({ motd: messageOfTheDay, shoutouts });
    } catch (error) {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
    }
  });



module.exports = server; 
