import { Schema, model } from 'mongoose';

const Study = new Schema({
  lesson: {
    type: Number,
    requared: true
  },
  lang: {
    type: String,
    requared: true
  },
  level: {
    type: Number,
    requared: true
  },
  accuracy: {
    type: Number,
    requared: true
  },
  speed: {
    type: Number,
    requared: true
  },
});

export default model('Study', Study);
