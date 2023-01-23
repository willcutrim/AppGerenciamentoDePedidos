import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";
import { TokensDTO } from "../dtos/TokensDTO";

const { setItem, getItem, removeItem } = AsyncStorage;

export async function storageAuthTokenSave(token: string, refreshToken: string){
    await setItem(AUTH_TOKEN_STORAGE, JSON.stringify({token, refreshToken}));
}

export async function storageAuthTokenGet(){
    const token = await getItem(AUTH_TOKEN_STORAGE);
    const token_list: TokensDTO = token ? JSON.parse(token) : {};
    
    return token_list
}


export async function storageAuthTokenDelete(){
    await removeItem(AUTH_TOKEN_STORAGE);
}