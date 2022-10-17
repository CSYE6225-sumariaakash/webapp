import express from 'express';
import router from './src/route/routhealthz.js';
import bodyParser from 'body-parser';

const app = express();
//either use env variable port or 3000
const port = process.env.PORT || 3000;

//parsing incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }))
//json used
app.use(bodyParser.json())
app.use(router);

//landing page
app.get('/', (req, res) => {
  res.send("Assignment1");
});

//application listens/run on port
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default app;