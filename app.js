import express from 'express';
import router from './src/route/routhealthz.js';
import bodyParser from 'body-parser';
import db from './src/models/index.js';
import user_router from './src/route/userRoute.js';

const app = express();
//either use env variable port or 3000
const port = process.env.PORT || 3000;

db.sequelize.sync();

//parsing incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }))
//json used
app.use(bodyParser.json())
app.use(router);

app.use(user_router);

//landing page
app.get('/', (req, res) => {
  res.send("Assignment1");
});

//application listens/run on port
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default app;