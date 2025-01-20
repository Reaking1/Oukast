
import { io, Socket } from "socket.io-client";


const SERVER_URL = 'http://localhost:5000';

let socket: Socket | null = null;

/**
 * Initializes a socket connection.
 */

export const initialozeSocket = (): Socket => {
   if (!socket) {
    socket = io(SERVER_URL, {
        transports: ['websocket'],
        autoConnect: true,
    });

    socket.on('connect', () => {
        console.log('Socket connected:', socket?.id);
    });

    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
    });
   }
   return socket;
};

/**
 * Emits an event via the socket connection.
 * @param event - The event name.
 * @param data - The data to emit.
 */

 export const onSocketEvent = (event: string, callback: (data: any) => void): void => {
    if (socket) {
        socket.on(event, callback);
    } else {
        console.warn('Socket not initialized. Call initializeSocket() firts.')
    }
 };


 /**
 * Disconnects the socket connection.
 */
export const disconnectSocket = (): void => {
    if(socket) {
        socket.disconnect();
        socket = null;
        console.log('Socket disconnected manually')
    }
}
