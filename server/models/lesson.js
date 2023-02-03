import { Schema, model } from 'mongoose';

const Lesson = new Schema({
  index: {
    type: Number,
    requared: true
  },
  name: {
    type: String,
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
