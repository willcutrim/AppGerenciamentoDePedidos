import AsyncStorage from "@react-native-async-storage/async-storage";
import { PEDIDOS_COLLETION } from "../storageConfig";
import { pedidosGetAll } from "./pedidosGetAll";

export async function pedidoCreate(newpedido: string){

    try {
        const storedPedidos = await pedidosGetAll();

        const storage = JSON.stringify([storedPedidos, newpedido]);
        await AsyncStorage.setItem(PEDIDOS_COLLETION, storage)
    } catch (error) {
        throw error;
    }
}