import User from '../models/user.js';
import Lesson from '../models/lesson.js';
import game from '../models/game.js';

class Controller {
  async register(req, res) {
    try {
      res.json('register');
    } catch (error) {
      console.log(error);
    }
  }

  async auth(req, res) {
    try {
      res.json('auth');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Controller();