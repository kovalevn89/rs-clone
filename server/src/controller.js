import User from '../models/user.js';
import Lesson from '../models/lesson.js';
import Level from '../models/level.js';
import Study from '../models/study.js';
import Game from '../models/game.js';
import Test from '../models/test.js';
import Bcrypt from 'bcryptjs';
import {generateToken, verifyToken} from './helper.js';
import {validationResult} from 'express-validator'; 
import {GAMES_NAME} from '../src/constants.js';


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

  async userInfo(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({message: 'not authorized'});
      }

      const user = verifyToken(token);

      if (user === null) {
        return res.status(403).json({message: 'invalid token'});
      }

      const userFined = await User.findOne({_id: user.id}).populate('gamesScore').populate('progress');

      if (userFined !== null) {
        const {_id, username, accuracy, speed, gamesScore, progress} = userFined;
        return res.json({_id, username, accuracy, speed, gamesScore, progress});
      }

      return res.status(400).json({message: 'get user error'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'get user error'});
    }
  }

  async randomTest(req, res) {
    try {
      if (req.query.lang) {
        const tests = await Test.find({lang: req.query.lang});

        if (tests.length !== 0) {
          const test = tests[Math.floor(Math.random() * tests.length)];
          return res.json({text: test.text, lang: test.lang});
        }

        return res.status(400).json({message: 'not found'});
      }
      return res.status(400).json({message: 'bad request'});
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: 'get test error'});
    }
  }

  async updateUserTest(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({message: 'not authorized'});
      }

      const user = verifyToken(token);

      if (user === null) {
        return res.status(403).json({message: 'invalid token'});
      }

      if(req.body.speed && req.body.accuracy) {
        const speed = req.body.speed;
        const accuracy = req.body.accuracy;
  
        if (!speed || !accuracy) {
          return res.status(400).json({message: 'bad parametrs'});
        }

        const updateResult = await User.updateOne({_id: user.id}, {$set: {accuracy, speed}});

        if (updateResult.modifiedCount === 1) {
          return res.json({message: 'user updated'});
        }

        return res.json({message: 'nothing to update'});
      }

      return res.status(400).json({message: 'update error'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'update error'});
    }
  }

  async updateUserGameScore(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({message: 'not authorized'});
      }

      const user = verifyToken(token);

      if (user === null) {
        return res.status(403).json({message: 'invalid token'});
      }

      if(req.body.name && req.body.level && req.body.score) {
        const name = req.body.name;
        const level = req.body.level;
        const score = req.body.score;
  
        if (!level || !score|| !name) {
          return res.status(400).json({message: 'bad parametrs'});
        }

        const findUser = await User.findOne({username: user.name});

        if(!findUser) {
          return res.json({message: 'nothing to update'});
        }

        const updateResult = await Promise.allSettled(findUser.gamesScore.map(async (value) => {
          const game = await Game.findOne({'_id': value});
          if (game !== null) {
            if(game.name === name){
              await Game.updateOne({'_id': value}, {$set: {level, score}});

              return true;
            }
          }

          return false;
        }));

        if(updateResult.some(value => value.value)) {
          return res.json({message: 'game score updated'});
        } else {
          if(GAMES_NAME.includes(name)) {
            const game = new Game({name, level, score});
            findUser.gamesScore.push(game);
            findUser.save();
            game.save();
            
            return res.json({message: 'game score updated'});
          }
        }
      }

      return res.status(400).json({message: 'update error'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'update error'});
    }
  }

  async updateStadyProgress(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({message: 'not authorized'});
      }

      const user = verifyToken(token);

      if (user === null) {
        return res.status(403).json({message: 'invalid token'});
      }

      if(req.body.lesson && req.body.level && req.body.accuracy && req.body.speed && req.body.lang) {
        const lesson = req.body.lesson;
        const lang = req.body.lang;
        const level = req.body.level;
        const accuracy = req.body.accuracy;
        const speed = req.body.speed;
  
        if (!lesson || !level|| !accuracy || !speed) {
          return res.status(400).json({message: 'bad parametrs'});
        }

        const findUser = await User.findOne({username: user.name});

        if(!findUser) {
          return res.json({message: 'nothing to update'});
        }

        const updateResult = await Promise.allSettled(findUser.progress.map(async (value) => {
          const task = await Study.findOne({'_id': value});
          if (task !== null) {
            if(task.lesson === lesson && task.level === level && task.lang === lang){
              await Study.updateOne({'_id': value}, {$set: {accuracy, speed}});
              return true;
            }
          }
          return false;
        }));

        if(updateResult.some(value => value.value)) {
          return res.json({message: 'study progress updated'});
        } else {
          const game = new Study({lesson, lang, level, accuracy, speed});
          findUser.progress.push(game);
          findUser.save();
          game.save();
          
          return res.json({message: 'study progress updated'});
        }
      }

      return res.status(400).json({message: 'update error'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'update error'});
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

  async getLessons(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({message: 'not authorized'});
      }

      const user = verifyToken(token);

      if (user === null) {
        return res.status(403).json({message: 'invalid token'});
      }

      // by ID
      if (req.query.lang!==undefined && req.query.id!==undefined) {
        const index = req.query.id;
        const lang = req.query.lang;

        const find = await Lesson.findOne({index, lang}).populate('levels');

        if(!find) {
          return res.status(400).json('bad request');
        }

        return res.json({'index': find.index, 'name': find.name, 'lang': find.lang, 'levels': find.levels.map(
            value => ({'index': value.index, 'name': value.name, 'text': value.text})
          )});
      }

      // by lang
      if (req.query.lang!==undefined && req.query.id===undefined) {
        const lang = req.query.lang;

        const find = await Lesson.find({lang});

        if(!find) {
          return res.status(400).json('bad request');
        }

        return res.json(find.map(value => ({'index': value.index, 'name': value.name, 'lang': value.lang})));
      }

      return res.status(400).json({message: 'lessons error'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'lessons error'});
    }
  }

  async getTopScore(req, res) {
    try {
      const topUsers = await User.find({accuracy:{$exists:true}, speed:{$exists:true}}).sort({speed: -1}).limit(10);

      if (topUsers.length !== 0) {
        return res.json(topUsers.map(value => ({'username': value.username, 'accuracy': value.accuracy, 'speed': value.speed})));
      }

      return res.status(400).json({message: 'not found'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'top score error'});
    }
  }

  async wakeup(req, res) {
    try {
      return res.json({matrix: 'Follow the white rabbit.'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'wakeup error'});
    }
  }
}

export default new Controller();
