import { Game } from '../models/index.js';

class GameController {
    getAll = async (req, res) => {
        const games = await Game.findAll()

        res.json(games);
    }

    getOneGame = async (req, res) => {
        const { id } = req.params;

        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: "Jeu introuvable" });
        }

        res.json(game);
    }

    createGame = async (req, res) => {
        const { title, description, genre, developer, releaseDate, platform, image } = req.body;

        const game = await Game.create({
            title,
            description,
            genre,
            developer,
            releaseDate,
            platform,
            image
        });

        return res.json(game);
        
    }

    updateGame = async (req, res) => {
        const { id } = req.params;

        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: "Jeu introuvable" });
        }

        await game.update(req.body);

        return res.json(game);

    }

    deleteGame = async (req, res) => {
        const { id } = req.params;

        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: "Jeu introuvable" });
        }

        await game.destroy();

        return res.json({ message: "Jeu supprimé" });

    }
}

export default new GameController;