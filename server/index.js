import express from 'express';

const PORT = 5000;
const app = express();

function run() {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
}

run();