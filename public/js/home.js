// Conectar al servidor de Socket.IO
    const socket = io();

    // Nuevo evento
    // socket.emit('nuevoMensaje', { message: '¡Hola desde el cliente!' });

    // Escuchar mensajes del servidor
    socket.on('welcome', (data) => {
        console.log('Mensaje del servidor:', data);
    }); 

    // Capturamos historial de mensajes
    socket.on('historial de mensajes', (dataMessages) => {
        const chatBox = document.getElementById('chatBox');
        dataMessages.forEach(dataMessage => {
            const messageElement = document.createElement('p');
            messageElement.textContent = `${dataMessage.username}: ${dataMessage.message}`;
            chatBox.appendChild(messageElement);
        });
    });

    // Formulario de chat
    const formChat = document.getElementById('formChat');
    const inputChat = document.getElementById('inputChat');
    const usernameInput = document.getElementById('username');
    formChat.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        const message = inputChat.value;
        const username = usernameInput.value;
        socket.emit('nuevoMensaje', {message, username});
        inputChat.value = '';
        usernameInput.value = '';
    });


    // Escuchar mensajes retransmitidos del servidor
    socket.on('retransmitirMensaje', (dataMessage) => {
        // Insertar el mensaje en la página (puedes personalizar esto según tu diseño)
        const chatBox = document.getElementById('chatBox');
        const messageElement = document.createElement('p');
        messageElement.textContent = `${dataMessage.username}: ${dataMessage.message}`;
        chatBox.appendChild(messageElement);
    }); 