import express from 'express';
import mongoose from 'mongoose';

const PORT = 5000;
const app = express();

app.use(express.json());

async function run() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb+srv://typego:pa123sword@cluster0.il8qg3f.mongodb.net/?retryWrites=true&w=majority');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
}

run();