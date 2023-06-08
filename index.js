const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// Ruta para obtener la lista de contactos
app.get('/contacts', (req, res) => {
  fs.readFile('contacts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al obtener los contactos:', err);
      res.status(500).json({ message: 'Error al obtener los contactos' });
    } else {
      const contacts = JSON.parse(data);
      res.json(contacts);
    }
  });
});

// Ruta para agregar un nuevo contacto
app.post('/contacts', (req, res) => {
  fs.readFile('contacts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer los contactos:', err);
      res.status(500).json({ message: 'Error al leer los contactos' });
      return;
    }

    const contacts = JSON.parse(data);
    const { name, email, phone } = req.body;

    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone
    };

    contacts.push(newContact);

    fs.writeFile('contacts.json', JSON.stringify(contacts), (err) => {
      if (err) {
        console.error('Error al guardar el contacto:', err);
        res.status(500).json({ message: 'Error al guardar el contacto' });
      } else {
        res.status(201).json({ message: 'Contacto agregado correctamente', contactId: newContact.id });
      }
    });
  });
});

// Ruta para cargar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
