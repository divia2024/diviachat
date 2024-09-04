const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicializar la aplicación Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos del lado del cliente
app.use(express.static('public'));

// Manejar conexiones de socket
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Escuchar mensajes del cliente
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emitir mensaje a todos los usuarios
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
