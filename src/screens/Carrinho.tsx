import { FlatList, VStack, Text, Center, Box } from "native-base";
import { AppBar } from "../components/AppBar";

import { useEffect, useState } from "react";

import { ProdutoDTO } from "../dtos/ProdutosDTO";
import { CardPedido } from "../components/CardPedido";
import { Loading } from "../components/Loading";
import { PEDIDOS_COLLETION } from "../storage/storageConfig";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { storagePedidoDelete } from "../storage/pedidos/pedidoDelete";
import { ButtonB } from "../components/Button";
import { storageUserDelete, storageUserGet } from "../storage/storageUser";
import { storageAuthTokenDelete, storageAuthTokenGet } from "../storage/storageAuthToken";


export function Carrinho(){

    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [pedido, setPedido] = useState<ProdutoDTO[]>([])

    const { getItem, setItem } = useAsyncStorage(PEDIDOS_COLLETION);

    async function cleanItems(){
        try {
            setIsLoading(true);
            await storagePedidoDelete();
            const response = await getItem();
	        const previousData = response ? JSON.parse(response) : [];

            setPedido(previousData);
            
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    async function handleRemoveItem(uid: string){
        try {
            setIsLoading(true);

            
	        const response = await getItem();
	        const previousData = response ? JSON.parse(response) : [];
	
	        const data = previousData.filter((item: ProdutoDTO) => item.uid !== uid);
	        setItem(JSON.stringify(data));
            setPedido(data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }

    }

    async function handleNavigatio(){
        navigation.goBack();
    }

    async function fetchItems(){
        try {
            setIsLoading(true);
            
            const storage =  await getItem();

            const pedidos = storage ? JSON.parse(storage) : [];

            setPedido(pedidos);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <VStack flex={1}>
            <AppBar title="Carrinho" onpress={handleNavigatio} icon="arrow-back"/>
            {
            isLoading ? <Loading/> :
            
            
            <FlatList
                data={pedido}
                keyExtractor={item => item.uid}
                renderItem={({ item }) => (
                    <CardPedido
                        data={item}
                        onpress={() =>handleRemoveItem(item.uid)}
                    />
                    )}
                    ListEmptyComponent={() => (
                        <Center flex={1}>
                            <Text color="black" textAlign="center" >
                                Não há pedidos
                            </Text>
                        </Center>
                      )}
                      _contentContainerStyle={{ paddingBottom: 20 }}
            />
        }
        <Box alignItems="center">
            <ButtonB
                title="Limpar"
                onPress={cleanItems}
                largura="full"
                altura={12}
            />
        </Box>
        </VStack>
        
    );    
}