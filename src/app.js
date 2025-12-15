import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';


// Para manjear el servidor HTTP 
const app = express();
const server = http.createServer(app); // Cuando queramos utilizar websockets, debemos crear el servidor HTTP manualmente

// Para manejar los websockets
const io = new Server(server);

// Habilitar uso de recursos estáticos
app.use(express.static('public'));


// HANDBLEBARS CONFIG
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// ENDPOINTS
app.use('/', viewsRouter);

// Guardar mensajes en memoria (deberiaria ser una base de datos)
const messages = [];

// Websockets desde el servidor
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', socket.id);
    // Enviar eventos al cliente
    socket.emit('historial de mensajes', messages);    

    // Escuchar eventos del cliente
    // Debe tener el mismo nombre que el emitido desde el cliente
    socket.on('nuevoMensaje', (data) => {
        messages.push(data);
        
        io.emit('retransmitirMensaje', data);
    }); 


});



// Para iniciar el servidor
server.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
