
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://kiamet:NDJdWX38X7HK5Fax@cluster0.neqnxp8.mongodb.net/tracking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware pour activer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Remplacez avec l'URL de votre application AngularJS
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Middleware pour parser le corps des requêtes au format JSON
app.use(express.json());

// Définition des routes de l'API
app.use('/api/package', require('./routes/packages'));
app.use('/api/delivery', require('./routes/deliveries'));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
