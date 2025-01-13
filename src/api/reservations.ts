import express, { Request, Response } from 'express';
import { Reservations } from '../models';

const router = express.Router();

type ReservationResponse = { [key: string]: any };

router.get<{}, ReservationResponse>('/', async (req: Request, res: Response) => {
    try {
        const reservations = await Reservations.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des réservations." });
    }
});

router.get<{}, ReservationResponse>('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "Vous devez chercher via l'ID de la réservation." });
        return;
    }

    try {
        const reservation = await Reservations.findOne({ where: { id } });
        if (!reservation) {
            res.status(404).json({ message: "Réservation non trouvée" });
            return;
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la réservation." });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dateDebut, dateFin, passagers, depart, arrivee, adresse, status, userId, voitureId } = req.body;

    if (!dateDebut || !dateFin || !passagers || !depart || !arrivee || !adresse || !status || !userId || !voitureId) {
        res.status(400).json({ message: "Les données sont incomplètes." });
        return;
    }

    try {
        await Reservations.create(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la création de la réservation." });
    }
});

router.put('/:id/status', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
        res.status(400).json({ message: "Les données sont incomplètes." });
        return;
    }

    try {
        const reservation = await Reservations.findOne({ where: { id } });

        if (!reservation) {
            res.status(404).json({ message: "Réservation non trouvée." });
            return;
        }

        reservation.status = status;
        await reservation.save();

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la réservation." });
    }
});

router.put('/:id/passagers', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { passagers } = req.body;

    if (!id || !passagers || !Array.isArray(passagers) || passagers.length === 0) {
        res.status(400).json({ message: "Les passagers doivent être fournis sous forme de tableau." });
        return;
    }

    try {
        const reservation = await Reservations.findOne({ where: { id } });

        if (!reservation) {
            res.status(404).json({ message: "Réservation non trouvée." });
            return;
        }

        reservation.passagers = [...reservation.passagers, ...passagers];
        await reservation.save();

        res.status(200).json({
            message: "Passagers ajoutés avec succès.",
            passagers: reservation.passagers
        });
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout des passagers." });
    }
});

export default router;
