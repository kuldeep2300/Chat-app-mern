import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// First creating the context of socket.
export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  // To use the socket.io from the client side we have to install one package called - "bun add or i socket.io-client"
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id, // send the userId to the server
        },
      });
      setSocket(socket);

      // socket.on() is used to listen to the events, can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // cleanup function when the component unmounts (not visible to the user)
      return () => socket.close(); // close the socket connection when the component unmounts

    } else {
      if(socket) {
        socket.close(); // close the socket connection when the component unmounts
        setSocket(null); // set the socket to null when the component unmounts
      }
    }
  }, [authUser]);

  return (
    // we are passing the socket to the children components, here we are passing 2 values that's why we pass values inside the 2 curly braces, meaning first bracket to enter inside the JavaScript world and second bracket show that we are passing values as an object.
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
