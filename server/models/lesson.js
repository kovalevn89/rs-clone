import { Schema, model } from 'mongoose';

const Lesson = new Schema({
  index: {
    type: Number,
    unique: true,
    requared: true
  },
  name: {
    type: String,
    unique: true,
    requared: true
  },
  lang: {
    type: String,
    requared: true
  },
  levels: [{
    type: Schema.Types.ObjectId,
    ref: 'Level'
  }]
});

export default model('Lesson', Lesson);
