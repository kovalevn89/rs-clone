import User from '../models/user.js';
import Lesson from '../models/lesson.js';
import game from '../models/game.js';
import Bcrypt from 'bcryptjs';
import generateToken from './helper.js';
import { validationResult } from 'express-validator'; 

class Controller {
  async register(req, res) {
    try {
      // validation user input
      const validationError = validationResult(req);

      if(!validationError.isEmpty()) {
        return res.status(400).json({message: `input validation error: ${validationError.errors[0].msg}`});
      }

      const username = req.body.username;
      const password = req.body.password;

      // check for user exist
      const findUserName = await User.findOne({username});

      if (findUserName !== null) {
        return res.status(400).json({message: 'user exists'});
      }

      // crypt password
      const passwordHash = Bcrypt.hashSync(password, 5);

      // save user
      const user = new User({username, password: passwordHash});
      await user.save();

      return res.json({message: 'user registered'});

    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'registration error'});
    }
  }

  async auth(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      // check for user exist
      const findUserName = await User.findOne({username});

      if (findUserName === null) {
        return res.status(400).json({message: 'user not exists'});
      }

      // check password
      if (!Bcrypt.compareSync(password, findUserName.password)) {
        return res.status(400).json({message: 'invalid password'});
      }

      // generate token
      const token = generateToken(findUserName._id, findUserName.username);

      return res.json({token}); 
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'login error'});
    }
  }
}

export default new Controller();