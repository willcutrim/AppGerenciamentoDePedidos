import AsyncStorage from "@react-native-async-storage/async-storage";
import { PEDIDOS_COLLETION } from "../storageConfig";
import { pedidosGetAll } from "./pedidosGetAll";

export async function pedidoCreate(newpedido: string){

    try {
        const storagePedidos = await pedidosGetAll();
        const rersponseData = storagePedidos ? JSON.parse(storagePedidos) : [];
        const storage = JSON.stringify([...rersponseData, newpedido]);
        await AsyncStorage.setItem(PEDIDOS_COLLETION, storage)
        
    } catch (error) {
        throw error;
    }
}