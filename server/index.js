import Express from 'express';
import Mongoose from 'mongoose';
import router from './src/route.js';
import morgan from 'morgan';
import cors from 'cors';
import {PORT, DBLOGIN, DBPASSWORD} from './src/constants.js';

const app = Express();

app.use(cors({
  origin: '*'
}));
app.use(morgan('combined'));
app.use(Express.json());
app.use('/api', router);

async function run() {
  try {
    Mongoose.set("strictQuery", false);
    await Mongoose.connect(`mongodb+srv://${DBLOGIN}:${DBPASSWORD}@cluster0.il8qg3f.mongodb.net/?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
}

run();