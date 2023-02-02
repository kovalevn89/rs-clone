import { Schema, model } from 'mongoose';

const User = new Schema({
  username: {
    type: String,
    unique: true,
    requared: true
  },
  password: {
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
  },
  gamespace:{
    type: String,
    ref: 'Game'
  },
  gamewhac: {
    type: String,
    ref: 'Game'
  },
  gameshoter: {
    type: String,
    ref: 'Game'
  },
  lessons: [{
    type: String,
    ref: 'Lesson'
  }]
});

export default model('User', User);