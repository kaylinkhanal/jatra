"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const MyComponent = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Establish the Socket.IO connection
    const newSocket = io("http://localhost:9000"); 

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <p>
        Socket.IO Connection Status:{" "}
        {isConnected ? "Connected" : "Disconnected"}
      </p>
    </div>
  );
};

export default MyComponent;
