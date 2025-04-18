import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";

let socket: Socket | null = null;

// SocketEvents Interface
interface SocketEvents {
  message: { text: string; userId: string };
  userJoined: { userId: string; username: string };
  userLeft: { userId: string };
}
/**
 * Initializes a socket connection.
 */
export const initializeSocket = (): Socket => {
  if (!socket || !socket.connected) {
    socket = io(SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket connection error:", reason);
      setTimeout(() => {
        if(!socket?.connected) {
          console.log("Reconnectiong:", reason);
          socket?.connect();
        }
      }, 3000)
    });
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
    });
  }
  return socket;
};

/**
 * Listens for a socket event.
 * @param event - The event name.
 * @param callback - The callback function.
 */
export const onSocketEvent = <K extends keyof SocketEvents>(
  event: K,
  callback: (data: SocketEvents[K]) => void
): void => {
  if (socket) {
    socket.on(event as string, (data) => {
      callback(data as SocketEvents[K]); // Ensure data matches the expected type
    });
  } else {
    console.warn("Socket not initialized. Call initializeSocket() first.");
  }
};

/**
 * Emits an event via the socket connection.
 * @param event - The event name.
 * @param data - The data to emit.
 */
export const emitSocketEvent = <K extends Extract<keyof SocketEvents, string>>(
  event: K,
  data: SocketEvents[K]
): void => {
  if (socket) {
    socket.emit(event, data);
  } else {
    console.warn("Socket not initialized. Call initializeSocket() first.");
  }
};

/**
 * Disconnects the socket connection.
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected manually");
  }
};
