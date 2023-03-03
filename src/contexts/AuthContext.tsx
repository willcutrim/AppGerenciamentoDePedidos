import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";

import { storageUserDelete, storageUserGet, storageUserSave } from "../storage/storageUser";


export type AuthContextDataProps = {
    user: UserDTO;
    login: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
    
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    

    async function login(username: string, password: string){
        try {
            const { data } = await api.post('usuario/api-login/', { username, password });

            if(data.user){
                setUser(data.user);
                 
                await storageUserSave(data.user);
                
                
            }
            
        } catch (error) {
            throw error
        }
    }

    async function signOut(){
        try {
            setUser({} as UserDTO);
            await storageUserDelete();
        } catch (error) {
            throw error;
        }
    }

    async function loadUserData(){
        try {
            const userLogged = await storageUserGet();
            
            if(userLogged){
                setUser(userLogged);
            }
        } catch (error) {
	        throw error
        }
    }


    useEffect(() => {
        loadUserData();
    }, []);


    return (
        <AuthContext.Provider value={{user, login, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}