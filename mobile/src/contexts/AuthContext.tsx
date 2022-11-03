import { createContext, ReactNode } from "react";

interface userProps {
    name: string
    avatarUrl: string
}

export interface AuthContextDataProps {
    user: userProps
    signIn: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const signIn = async () => {
        console.log('Logged!')
    }

    const user = {
        name: 'Carlos Casara',
        avatarUrl: 'https://github.com/caducasara.png'
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user
        }}>
            { children }
        </AuthContext.Provider>
    )
}