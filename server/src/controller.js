import User from '../models/user.js';
import Lesson from '../models/lesson.js';
import game from '../models/game.js';
import Bcrypt from 'bcryptjs';
import {generateToken, verifyToken} from './helper.js';
import {validationResult} from 'express-validator'; 


class Controller {
  async register(req, res) {
    try {
      const validationError = validationResult(req);

      if(!validationError.isEmpty()) {
        return res.status(400).json({message: `input validation error: ${validationError.errors[0].msg}`});
      }

      const username = req.body.username;
      const password = req.body.password;

      const findUser = await User.findOne({username});

      if (findUser !== null) {
        return res.status(400).json({message: 'user exists'});
      }

      const passwordHash = Bcrypt.hashSync(password, 5);

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

      const findUser = await User.findOne({username});

      if (findUser === null) {
        return res.status(400).json({message: 'user not exists'});
      }

      if (!Bcrypt.compareSync(password, findUser.password)) {
        return res.status(400).json({message: 'invalid password'});
      }

      const token = generateToken(findUser._id, findUser.username);

      return res.json({token}); 
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'login error'});
    }
  }

  async deleteUser(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({message: 'not authorized'});
      }

      const user = verifyToken(token);

      if (user === null) {
        return res.status(403).json({message: 'invalid token'});
      }

      const deleteResult = await User.deleteOne({_id: user.id});

      if (deleteResult.deletedCount === 1) {
        return res.json({message: 'user deleted'});
      }

      return res.status(400).json({message: 'delete user error'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'delete user error'});
    }
  }
}

export default new Controller();