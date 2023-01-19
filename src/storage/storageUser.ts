import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_STORAGE } from "./storageConfig";
import { UserDTO } from "../dtos/UserDTO";

const { getItem, removeItem, setItem } = AsyncStorage;

export async function storageUserSave(user: UserDTO){
    await setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(){
    const storage =  await getItem(USER_STORAGE);

    const user: UserDTO = storage ? JSON.parse(storage) : {};

    return user;
}

export async function storageUserDelete(){
    await AsyncStorage.removeItem(USER_STORAGE);
}