import Token from 'jsonwebtoken';
import { TOKEN_KEY, TOKEN_EXP } from '../src/constants.js'

export function generateToken(id, name) {
  const payload = {id, name};

  return Token.sign(payload, TOKEN_KEY, {expiresIn: TOKEN_EXP});
}

export function verifyToken(token) {
  try { 
    return Token.verify(token, TOKEN_KEY);
  } catch (error){
    return null;
  }
}
