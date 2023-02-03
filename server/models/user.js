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
  gamesScore:[{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  progress: [{
    type: Schema.Types.ObjectId,
    ref: 'Study'
  }]
});

export default model('User', User);