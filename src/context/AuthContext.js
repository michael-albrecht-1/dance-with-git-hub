import React, { createContext, useEffect, useState} from 'react';
import { auth } from 'src/utils/firebaseConfig';

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [userState, setUserState] = useState(null);
    const [authPending, setAuthPending] = useState(true);

    const signIn = (username, password) => {
        return auth.signInWithEmailAndPassword(username, password);
    }

    const signUp = (username, password) => {
        return auth.createUserWithEmailAndPassword(username, password);
    }

    const signOut = () => {
      console.log('deco');
      auth.signOut();
    }

    useEffect(() => {
        return auth.onAuthStateChanged((userAuth) => {
            setUserState(userAuth);
            setAuthPending(false);
        })
    }, [])

    if (authPending) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"}}
            >
                <div>Authentication in progress</div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{
            signIn: signIn,
            signUp: signUp,
            signOut: signOut,
            userState: userState
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
