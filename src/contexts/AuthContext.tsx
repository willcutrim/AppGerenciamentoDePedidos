import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";

import { storageUserDelete, storageUserGet, storageUserSave } from "../storage/storageUser";
import { storageAuthTokenDelete, storageAuthTokenGet, storageAuthTokenSave } from "../storage/storageAuthToken";
import { TokensDTO } from "../dtos/TokensDTO";


export type AuthContextDataProps = {
    user: UserDTO;
    tokens: TokensDTO;
    login: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
    
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [ tokens, setTokens] = useState<TokensDTO>({} as TokensDTO);

    async function login(username: string, password: string){
        try {
            const { data } = await api.post('usuario/api-login/', { username, password });
            if(data.user){
                // console.log(`pegando do contex => ${data.tokens.access}`);
                setUser(data.user);
                setTokens(data.tokens.access);

                await storageUserSave(data.user);
                await storageAuthTokenSave(data.tokens.access, data.tokens.refresh);
               
                
            }
            
        } catch (error) {
            throw error
        }
    }

    async function signOut(){
        try {
            setUser({} as UserDTO);
            await storageUserDelete();
            await storageAuthTokenDelete();
        } catch (error) {
            throw error;
        }
    }

    async function loadUserData(){
        try {
            const userLogged = await storageUserGet();
            const tokenLogged = await storageAuthTokenGet();
        
            if(userLogged && tokenLogged){
                // console.log('passou aqui')
                setTokens(tokenLogged);
                setUser(userLogged);
                
            }
        } catch (error) {
	        throw error
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    
    return (
        <AuthContext.Provider value={{user, tokens, login, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}