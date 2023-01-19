import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { useToast } from "native-base";
import { storageUserGet, storageUserSave } from "../storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenSave } from "../storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (username: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const toast = useToast();
    
    async function signIn(username: string, password: string){
        try {
            const { data } = await api.post('usuario/api-login/',{ username, password });

            if(data.user){
                setUser(data.user);
                await storageUserSave(data.user);
                await storageAuthTokenSave(data.tokens.access, data.tokens.refresh);
                
            }
            
        } catch (error) {
            throw error
        }
    }

    async function loadUserData(){
      const userLogged = await storageUserGet();

      if(userLogged){
        setUser(userLogged);
      }
    }

    useEffect(() => {
        loadUserData();
    }, [])
    return (
        <AuthContext.Provider value={{user, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}