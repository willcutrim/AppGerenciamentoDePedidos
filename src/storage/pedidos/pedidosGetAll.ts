import AsyncStorage from "@react-native-async-storage/async-storage";

import { PEDIDOS_COLLETION } from "../storageConfig";

export async function pedidosGetAll() {
    try {
        const storage = await AsyncStorage.getItem(PEDIDOS_COLLETION);
    
        const pedidos: string[] = storage ? JSON.parse(storage) : [];
    
        return pedidos;
    } catch (error) {
        return error;
    }
}