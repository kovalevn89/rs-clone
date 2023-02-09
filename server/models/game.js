import { Schema, model } from 'mongoose';

const Game = new Schema({
  name: {
    type: String,
    requared: true
  },
  level: {
    type: Number,
    requared: true
  },
  score: {
    type: Number,
    requared: true
  }
});

export default model('Game', Game);