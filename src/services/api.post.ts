import { useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "./api";
import { storageUserSave } from "../storage/storageUser";

const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

async function storageUserAndTokenSave(userData: UserDTO) {
    try {
        setIsLoadingUserStorageData(true);

        await storageUserSave(userData);
    } catch (error) {
        throw error;
    } finally {
        setIsLoadingUserStorageData(false);
    }
}


export async function SigIn(username: string, password: string){
    try {
        const { data } = await api.post('usuario/api-login/', { username, password });
        if(data.username && data.token){
            storageUserAndTokenSave(data.username);

        }
    } catch (error) {
        throw error;
    }
}