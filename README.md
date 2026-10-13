# GameBox

## Technologies utilisées

- **Frontend :** React, Vite, JavaScript, HTML/CSS
- **Backend :** Node.js, Express, Sequelize
- **Base de données :** MySQL
- **Stockage local :** localStorage

## Installation et lancement

**Prérequis :** Node.js, npm et XAMPP.

### 1. Base de données

- Démarrer **Apache** et **MySQL** dans XAMPP.
- Ouvrir phpMyAdmin : http://localhost/phpmyadmin
- Créer une base de données nommée `api_games` si elle n'existe pas.

Les tables sont créées automatiquement par Sequelize au lancement du backend. La base sera vide si aucune donnée n'a été ajoutée.

### 2. Backend

Dans un premier terminal :

```bash
cd api-games
npm install
npx nodemon index.js
```

### 3. Frontend

Dans un deuxième terminal :

```bash
cd front-games
npm install
npm run dev
```

### 4. Ouvrir l'application

Copier l'adresse affichée dans le terminal:

http://localhost:5173/

Les deux terminaux doivent rester ouverts.
