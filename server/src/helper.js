import Token from 'jsonwebtoken';
import { TOKEN_KEY, TOKEN_EXP } from '../src/constants.js'

function generateToken(id, name) {
  const payload = {id, name};

  return Token.sign(payload, TOKEN_KEY, {expiresIn: TOKEN_EXP});
}

export default generateToken;