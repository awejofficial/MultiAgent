import { io, type Socket } from "socket.io-client";
import { API_BASE } from "./api";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket) return socket;
  const url = API_BASE.replace(/^http/, "ws");
  socket = io(url, {
    path: "/ws",
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
  });
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect();
}
