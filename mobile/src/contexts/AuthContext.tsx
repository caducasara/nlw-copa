import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session"; 
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

interface userProps {
    name: string
    avatarUrl: string
}

export interface AuthContextDataProps {
    user: userProps
    signIn: () => Promise<void>
    isUserLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<userProps>({} as userProps);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '64538942078-8vvfpr0pblpncgvkv818l4hns7t3kb72.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    });

    const signIn = async () => {
        try {
            setIsUserLoading(true);
            await promptAsync();
        }   catch(err){
            console.log(err)
            throw err;
        }   finally {
            setIsUserLoading(false);
        }
    }

    const signInWithGoogle = async (accessToken: string) => {
        console.log('token',accessToken )
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);

    return (
        <AuthContext.Provider value={{
            signIn,
            user,
            isUserLoading
        }}>
            { children }
        </AuthContext.Provider>
    )
}