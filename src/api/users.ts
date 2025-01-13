import express, { Request, Response } from 'express';
import { Users } from '../models';
const router = express.Router();

type UserResponse = { [key: string]: any }; 

router.get<{}, UserResponse[]>('/', async (req: Request, res: Response) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs." });
    }
});

router.get<{ id: string }, UserResponse>('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "Vous devez chercher via l'ID de l'utilisateur." });
        return;
    }

    try {
        const user = await Users.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur." });
    }
});

router.get<{ email: string }, UserResponse>('/email/:email', async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email) {
        res.status(400).json({ message: "Vous devez chercher via l'email de l'utilisateur." });
        return;
    }

    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur par email." });
    }
});

router.put<{}, UserResponse>('/', async (req: Request, res: Response) => {
    const { nom, prenom, email, password, role, status } = req.body;

    if (!nom || !prenom || !email || !password || !role || !status) {
        res.status(400).json({ message: "Les données sont incomplètes." });
        return;
    }

    try {
        await Users.create(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur." });
    }
});

router.put<{ id: string }, UserResponse>('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
        res.status(400).json({ message: "Les données sont incomplètes." });
        return;
    }

    try {
        const user = await Users.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }

        user.status = status;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'utilisateur." });
    }
});

export default router;
