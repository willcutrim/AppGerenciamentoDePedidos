import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

const { setItem, getItem, removeItem } = AsyncStorage;

export async function storageAuthTokenSave(token: string){
    await setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet(){
    const token = await getItem(AUTH_TOKEN_STORAGE);

    return token
}


export async function storageAuthTokenDelete(){
    await removeItem(AUTH_TOKEN_STORAGE);
}