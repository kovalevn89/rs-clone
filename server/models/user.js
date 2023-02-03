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
  // lessons: [{
  //   type: String,
  //   ref: 'Lesson'
  // }]
});

export default model('User', User);