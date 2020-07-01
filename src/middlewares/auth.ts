import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;
    
    // Ausência do token
    if (!authorization) {
      return res.status(401).json({
        error: 'Token not provider'
      });
    }
  
    // Desestruturação de vetor (Bearer, ...token)
    const [, token] = authorization.split(' ');

    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, authConfig.secret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    
    const newToken = jwt.sign({ userId, username }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
    });

    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
}

export default Authenticate;