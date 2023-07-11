interface WebSocketClientProps {
  url: string;
  onMessage: (message: string) => void;
}

import { useEffect, useRef } from "react";

const WebSocketClient = ({ url, onMessage }: WebSocketClientProps) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socketRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("WebSocket connection is open");
    });

    socket.addEventListener("message", (event) => {
      const message = event.data;
      console.log("Received message from server:", message);

      onMessage(message);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      socket.close();
    };
  }, [url, onMessage]);

  return socketRef.current;
};

export default WebSocketClient;
