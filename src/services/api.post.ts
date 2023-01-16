import { useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { storageAuthTokenSave } from "../storage/storageAuthToken";
import { api } from "./api";
import { storageUserSave } from "../storage/storageUser";

const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
const [user, setUser] = useState<UserDTO>({} as UserDTO);

async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
        setIsLoadingUserStorageData(true);

        await storageUserSave(userData);
        await storageAuthTokenSave(token);
    } catch (error) {
        throw error;
    } finally {
        setIsLoadingUserStorageData(false);
    }
}

async function updateUserProfile(userUpdated: UserDTO) {
    try {
        setUser(userUpdated);
        await storageUserSave(userUpdated);

    } catch (error) {
        throw error;
    }
}

async function userAndTokenUpdate(userData: UserDTO, token: string) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);

    } catch (error) {
        throw error;
    }
}

export async function SigIn(username: string, password: string){
    try {

        const { data } = await api.post('usuario/api-login/', { username, password });
        if(data.username && data.token){
            storageUserAndTokenSave(data.username, data.token);


        }
    } catch (error) {
        throw error;
    }
}