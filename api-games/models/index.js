import db from '../config/db.js';

import Game from './Game.js';

db.sync();

export { 
    Game
}