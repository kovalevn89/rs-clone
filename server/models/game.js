import { Schema, model } from 'mongoose';

const Game = new Schema({
  name: {
    type: String,
    unique: true,
    requared: true
  },
  level: {
    type: String,
    requared: true
  },
  result: {
    type: String,
    requared: true
  }
});

export default model('Game', Game);