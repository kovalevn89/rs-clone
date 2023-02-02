import { Schema, model } from 'mongoose';

const Level = new Schema({
  index: {
    type: Number,
    requared: true
  },
  name: {
    type: String,
    unique: true,
    requared: true
  },
  text: {
    type: String,
    requared: true
  }
});

export default model('Level', Level);