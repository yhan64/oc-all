import db from './db';
import express from 'express';
import bodyParser from 'body-parser';

const app = express()
  .use(bodyParser.json());

const routes = {
  postEvent: '/post',
  getEvents: '/getEvents'
}

app.post(routes.postEvent, async function (req, res) {
  let ans = 'init';
  await db('events').insert(req.body)
  .then()
  .then(function (data) {
    ans = 'succeeded';
  })
  .catch(function (data) {
    ans = 'failed';
  });
  res
  .status(200)
  .send(ans)
})
// TODO: all events need to be ordered by dates
app.get(routes.getEvents, async function(req, res) {
  const events = await db.select().table('events').then();
  res.send(events);
})

app.get('/', async function(req, res) {
  res.send('Hello world');
})

app.listen(process.env.API_PORT, function () {
  console.log('Example app listening on port', process.env.API_PORT)
})