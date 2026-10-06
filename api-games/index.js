import express from 'express';
import cors from 'cors'
import gameRoutes from './routes/game.js'

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(gameRoutes);

app.listen(3000, () => {
    console.log("API démarrée sur http://localhost:3000");
});