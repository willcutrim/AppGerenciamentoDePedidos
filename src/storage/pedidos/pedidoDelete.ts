import AsyncStorage from "@react-native-async-storage/async-storage";
import { PEDIDOS_COLLETION } from "../storageConfig";

export async function storagePedidoDelete(){
    await AsyncStorage.removeItem(PEDIDOS_COLLETION);
}