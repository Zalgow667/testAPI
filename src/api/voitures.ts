import express, { Request, Response } from 'express';
import { Voitures } from '../models';

const router = express.Router();

type VoitureResponse = { [key: string]: any }; 

router.get<{}, VoitureResponse[]>('/', async (req: Request, res: Response) => {
    try {
        const voitures = await Voitures.findAll();
        res.status(200).json(voitures);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des voitures." });
    }
});

router.get<{ id: string }, VoitureResponse>('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "Vous devez chercher via l'ID de la voiture." });
        return;
    }

    try {
        const voiture = await Voitures.findOne({ where: { id } });
        if (!voiture) {
            res.status(404).json({ message: "Voiture non trouvée." });
            return;
        }
        res.status(200).json(voiture);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la voiture." });
    }
});

router.put<{}, VoitureResponse>('/', async (req: Request, res: Response) => {
    const { marque, modele, imatriculation, campus } = req.body;

    if (!marque || !modele || !imatriculation || !campus) {
        res.status(400).json({ message: "Les données sont incomplètes." });
        return;
    }

    try {
        await Voitures.create(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la création de la voiture." });
    }
});

export default router;
