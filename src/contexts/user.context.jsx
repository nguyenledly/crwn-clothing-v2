// create a context always has 2 things: CONTEXT and PROVIDER
import { createContext, useEffect, useState } from "react";
import { createUserToFireStore, onAuthStateChangedListener } from "../utils/firebase/firebase.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Provider is a component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    /* eslint-disable */
    useEffect(async () => {
        const authState = await onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserToFireStore(user);
            }
            setCurrentUser(user);
            console.log(user);
        });
        return authState;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}