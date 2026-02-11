const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('Error en el servidor:', error);
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

//Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    res.json(users);
  }
  catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

//Obtener un usuario por ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    if (!response.ok) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const user = await response.json();
    res.json(user);
  }
  catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});