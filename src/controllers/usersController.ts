import { Request, Response } from 'express';
import UserRepository from '../repositories/userRepository';
import User from '../entities/User';
import { getCustomRepository } from 'typeorm';

class UsersController {

    async getAll(request: Request, response: Response) {

        try {

            const userRepository = getCustomRepository(UserRepository);
            const users = await userRepository.find();
            return response.json(users);

        } catch (error) {
            return response.status(500).json({ error: String(error) });
        }
    }

    async getByUserName(request: Request, response: Response) {

        try {

            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findOne({ username: request.params.username });

            if (user && user.id > 0) {
                return response.json(user);
            } else {
                return response.status(404).json();
            }

        } catch (error) {
            return response.status(500).json({ error: String(error) });
        }
    }

    async get(request: Request, response: Response) {

        try {

            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findOne(Number(request.params.id));

            if (user && user.id > 0) {
                return response.json(user);
            } else {
                return response.status(404).json();
            }

        } catch (error) {
            return response.status(500).json({ error: String(error) });
        }
    }

    async create(request: Request, response: Response) {

        let user: User = request.body;

        try {
            const userRepository = getCustomRepository(UserRepository);

            const taxIdExists = await userRepository.findOne({ taxId: user.taxId });

            if (taxIdExists && taxIdExists.taxId) {
                return response.status(400).send({ error: "CNPJ/CPF já cadastrado" });
            }

            const userExists = await userRepository.findOne({ username: user.username });

            if (userExists && userExists.id > 0) {
                return response.status(400).send({ error: "Usuário já cadastrado" });
            }

            user.hashPassword();

            user = await userRepository.save(user);

            if (user && user.id > 0) {
                return response.json(user);
            } else {
                return response.status(400).json();
            }

        } catch (error) {
            return response.status(500).json({ error: String(error) });
        }
    }

    async recoverPassword(request: Request, response: Response) {

        const { taxId } = request.body;

        try {

            if (!taxId) {
                return response.status(400).send({ error: 'CNPJ/CPF não informado' });
            }

            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findOne({ taxId });

            if (user && user.id > 0) {

                //TODO: send email
                user.password = '';
                return response.status(200).send(user);

            } else {
                return response.status(404).json({ message: 'Usuário não localizado'});
            }

        } catch (error) {
            return response.status(500).json({ error: String(error) });
        }
    }
}

export default UsersController;