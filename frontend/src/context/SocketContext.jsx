/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// First creating the context of socket.
export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
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

// Why we don't pass the socket in useEffect array dependencies : In your code, the useEffect dependency array includes only authUser because that’s the only variable your useEffect needs to observe to correctly manage the socket connection. Including socket as a dependency causes issues because it creates a circular dependency loop: the useEffect updates socket, which then re-triggers useEffect, leading to unintended behavior and errors. Here’s why this happens: 
// authUser dependency: When authUser changes (i.e., when the user logs in or out), the useEffect runs to either create a new socket connection or close the existing one, which is the intended functionality. 
// Adding socket to dependencies: Adding socket would cause useEffect to re-run every time socket changes (e.g., every time it’s set or closed). This causes an infinite loop because: The setSocket(socket) line changes socket, which re-triggers useEffect, leading to more calls to setSocket, which restarts the process indefinitely. 
