import { Schema, model } from 'mongoose';

const Lesson = new Schema({
  name: {
    type: String,
    unique: true,
    requared: true
  },
  lang: {
    type: String,
    requared: true
  },
  accuracy:{
    type: Number,
    requared: true
  },
  speed: {
    type: Number,
    requared: true
  }
});

export default model('Lesson', Lesson);