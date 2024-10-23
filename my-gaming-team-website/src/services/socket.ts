import { io } from "socket.io-client";


const socket = io('http://localhost:5000', {
    transports: ['websocket'],
    withCredentials: true,
});


socket.on('connect', () => {
    console.log('Connected to socket.io server with ID:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from socket.io server');
});

export default socket;