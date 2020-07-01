import { Request, Response } from 'express';
import UserRepository from '../repositories/userRepository';
import User from '../entities/User';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import { getCustomRepository } from 'typeorm';

class AuthController {

    async index (request: Request, response: Response) {

        if (!request.body.username || !request.body.password) {
            return response.status(400).send();
        }

        try {
            const userRepository = getCustomRepository(UserRepository);
            const user: User = await userRepository.findOne({ username: request.body.username });

            if (!user) {
                return response.status(404).send({ error: "Usuário não localizado" });
            }

            if (!user.checkIfUnencryptedPasswordIsValid(request.body.password)) {
                return response.status(404).send({ error: "Senha incorreta" });
            }

            delete user.password;

            const token = jwt.sign( { user }, String(authConfig.secret), {
                expiresIn: authConfig.expiresIn
            });

            return response.status(200).json({ token });

        } catch (error) {
            return response.status(500).json({ error: String(error) });
        }
    }
}

export default AuthController;