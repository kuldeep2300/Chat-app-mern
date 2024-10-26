import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(); // This creates a new context object called AuthContext. Basically createContext() is a function that returns a context object. This context object can be used to share data between components without having to pass props through every level of the component tree.

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {  // This useAuthContext hook is used to access the authUser and setAuthUser values from the AuthContext.Provider.
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => { // This AuthContextProvider component is used to provide the authUser and setAuthUser values to the child components.
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null )

    return <AuthContext.Provider value={{authUser, setAuthUser}} >
        {children}
    </AuthContext.Provider>
}