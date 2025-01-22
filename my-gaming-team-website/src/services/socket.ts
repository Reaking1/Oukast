import { io, Socket } from "socket.io-client";

const SERVER_URL = 'http://localhost:5000';

let socket: Socket | null = null;

interface SocketEvents {
  message: { text: string; userId: string };
  userJoined: { userId: string; username: string };
  customEvent?: unknown; // Use `unknown` for fallback cases
  [key: string]: unknown;
}

/**
 * Initializes a socket connection.
 */
export const initializeSocket = (): Socket => {
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
export const emitSocketEvent = <T extends Extract<keyof SocketEvents, string>>(
  event: T,
  data: SocketEvents[T]
): void => {
  if (socket) {
    socket.emit(event, data);
  } else {
    console.warn('Socket not initialized. Call initializeSocket() first.');
  }
};

/**
 * Listens for a socket event.
 * @param event - The event name.
 * @param callback - The callback function.
 */
export const onSocketEvent = <T extends Extract<keyof SocketEvents, string>>(
  event: T,
  callback: (data: SocketEvents[T]) => void
): void => {
  if (socket) {
    socket.on(event, callback);
  } else {
    console.warn('Socket not initialized. Call initializeSocket() first.');
  }
};

/**
 * Disconnects the socket connection.
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected manually');
  }
};
