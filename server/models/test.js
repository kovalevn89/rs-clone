import { Schema, model } from 'mongoose';

const Test = new Schema({
  text: {
    type: String,
    unique: true,
    requared: true
  },
  lang: {
    type: String,
    requared: true
  }
});

export default model('Test', Test);